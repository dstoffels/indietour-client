import { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { User, useAuth } from './uthContext';
import api from 'utils/api';
import { Tour } from './TourContext';

interface BandContextValues {
	activeBand: Band | undefined;
	bands: Band[];
	fetchBands: () => Promise<void>;
	setActiveBand: (band_id: string | undefined) => Promise<void>;
	createBand: (bandData: Band) => Promise<void>;
	updateBand: (bandData: Band) => Promise<void>;
	deleteBand: () => Promise<void>;
	createBanduser: (banduserData: Banduser) => Promise<void>;
	updateBanduser: (banduserData: Banduser) => Promise<void>;
	deleteBanduser: (id: string | undefined) => Promise<void>;
	isBandAdmin: boolean;
}

interface BandProviderProps extends PropsWithChildren {}

const BandContext = createContext<BandContextValues>({} as BandContextValues);

const BandProvider = ({ children }: BandProviderProps) => {
	const [bands, setBands] = useState<Band[]>([]);

	const { user, updateUser } = useAuth();

	if (!user) return children;

	const fetchBands = async () => {
		const response = await api.get(
			`/bands?include=tours&archived_bands=${user.show_archived_bands}&archived_tours=${user.show_archived_tours}`,
		);
		setBands(response.data);
	};

	const setActiveBand = async (band_id: Band['id']) => {
		await updateUser({ active_band_id: band_id });
	};

	const createBand = async (bandData: Band) => {
		const response = await api.post('/bands', bandData);
		const band: Band = response.data;
		setActiveBand(band?.id);
		await fetchBands();
	};

	const updateBand = async (bandData: Band) => {
		await api.patch(`/bands/${activeBand?.id}`, bandData);
		await fetchBands();
	};

	const deleteBand = async () => {
		await api.delete(`/bands/${activeBand?.id}`);
		await fetchBands();
	};

	const createBanduser = async (banduserData: Banduser) => {
		await api.post(`/bands/${activeBand?.id}/users`, banduserData);
		await fetchBands();
	};

	const updateBanduser = async (banduserData: Banduser) => {
		await api.patch(`/bands/${activeBand?.id}/users/${banduserData.id}`, banduserData);
		await fetchBands();
	};

	const deleteBanduser = async (id: string | undefined) => {
		await api.delete(`/bands/${activeBand?.id}/users/${id}`);
		await fetchBands();
	};

	const activeBand = bands.find((band) => user?.active_band_id === band.id);

	const isBandAdmin = user.is_band_admin as boolean;

	return (
		<BandContext.Provider
			value={{
				activeBand,
				bands,
				fetchBands,
				setActiveBand,
				createBand,
				updateBand,
				deleteBand,
				createBanduser,
				updateBanduser,
				deleteBanduser,
				isBandAdmin,
			}}
		>
			{children}
		</BandContext.Provider>
	);
};

export default BandProvider;

export const useBands = () => useContext<BandContextValues>(BandContext);

export interface Band {
	id?: string;
	name?: string;
	is_archived?: boolean;
	owner?: User | null;
	bandusers?: Banduser[];
	tours?: Tour[];
}

export interface Banduser {
	id?: string;
	email?: string;
	is_admin?: boolean;
	username?: string;
}
