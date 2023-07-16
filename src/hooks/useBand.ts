import { AxiosError } from 'axios';
import { User, useAuth } from 'context/authContext';
import { GlobalContext } from 'context/globalContext';
import { useContext, useEffect, useState } from 'react';
import api from 'utils/api';

const useBand = () => {
	const { activeBand, setActiveBand } = useContext(GlobalContext);

	const fetchBand = async (band_id: string) => {
		try {
			const response = await api.get(`/bands/${band_id}?include=all`);
			setActiveBand(response.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error.response?.data);
			}
		}
	};

	return { activeBand, setActiveBand, fetchBand };
};

export default useBand;

export const useBands = () => {
	const { user, updateUser } = useAuth();
	const { activeBand, setActiveBand } = useBand();
	const [bands, setBands] = useState<Array<Band>>([]);

	const fetchBands = async () => {
		try {
			const response = await api.get('/bands?include=all');
			setBands(response.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error.response?.data);
				throw error;
			}
		}
	};

	const createBand = async (bandData: object) => {
		try {
			const response = await api.post('/bands', bandData);
			const band: Band = response.data;
			updateUser({ active_band_id: band.id });
			fetchBands();
		} catch (error) {
			if (error instanceof AxiosError) {
				throw error;
			}
		}
	};

	useEffect(() => {
		fetchBands();
	}, []);

	return { activeBand, setActiveBand, bands, fetchBands, createBand };
};

export class Band {
	id = '';
	name = '';
	is_archived = false;
	owner: User | null = null;
	bandusers: Array<User> = [];
}
