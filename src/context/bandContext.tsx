import { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { User, useAuth } from './authContext';
import api from 'utils/api';
import { Tour } from './tourContext';

const BandContext = createContext<BandContextProps>({} as BandContextProps);

/**
 *
 * @param initBands must be populated with getServerSideProps via pageProps, for any page that require this Provider.
 * @returns
 */
const BandProvider = ({ children, initBands }: BandProviderProps) => {
	const [bands, setBands] = useState<Band[]>(initBands);

	const { user, updateUser } = useAuth();

	const fetchBands = async () => {
		const response = await api.get('/bands?include=tours');
		setBands(response.data);
	};

	const setActiveBand = async (band_id: string) => {
		await updateUser({ active_band_id: band_id });
	};

	const createBand = async (bandData: object) => {
		const response = await api.post('/bands', bandData);
		const band: Band = response.data;
		setActiveBand(band.id);
		await fetchBands();
	};

	const activeBand = bands.find((band) => user?.active_band_id === band.id);

	return (
		<BandContext.Provider value={{ activeBand, bands, fetchBands, setActiveBand, createBand }}>
			{children}
		</BandContext.Provider>
	);
};

export default BandProvider;

export const useBands = () => useContext<BandContextProps>(BandContext);

export class Band {
	id = '';
	name = '';
	is_archived = false;
	owner: User | null = null;
	bandusers: Array<Banduser> = [];
	tours: Array<Tour> = [];
}

export class Banduser {
	id = '';
	email = '';
	is_admin = false;
	username = '';
}

interface BandContextProps {
	activeBand: Band | undefined;
	bands: Array<Band>;
	fetchBands: () => Promise<void>;
	setActiveBand: (band_id: string) => Promise<void>;
	createBand: (bandData: object) => Promise<void>;
}

interface BandProviderProps extends PropsWithChildren {
	initBands: Array<Band>;
}