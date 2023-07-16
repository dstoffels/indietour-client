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

	return { activeBand, fetchBand };
};

export default useBand;

export const useBands = () => {
	const { user, updateUser } = useAuth();
	const [bands, setBands] = useState<Array<Band>>([]);

	const fetchBands = async () => {
		const response = await api.get('/bands?include=all');
		setBands(response.data);
	};

	const setActiveBand = async (band_id: string) => {
		const response = await updateUser({ active_band_id: band_id });
		await fetchBands();
	};

	const createBand = async (bandData: object) => {
		const response = await api.post('/bands', bandData);
		const band: Band = response.data;
		setActiveBand(band.id);
	};

	const activeBand = bands.find((band) => user?.active_band_id === band.id);

	return { activeBand, setActiveBand, bands, fetchBands, createBand };
};

export class Band {
	id = '';
	name = '';
	is_archived = false;
	owner: User | null = null;
	bandusers: Array<User> = [];
}
