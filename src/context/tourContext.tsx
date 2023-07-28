import { createContext, useContext, PropsWithChildren } from 'react';
import { useAuth } from './authContext';
import api from 'utils/api';
import { useBands } from './bandContext';
import { useRouter } from 'next/router';

interface TourContextValues {
	activeTour: Tour | undefined;
	tours: Tour[] | undefined;
	setActiveTour: (tour_id: string) => Promise<void>;
	createTour: (tourData: object) => Promise<void>;
}

interface TourProviderProps extends PropsWithChildren {}

const TourContext = createContext<TourContextValues>({} as TourContextValues);

const TourProvider = ({ children }: TourProviderProps) => {
	const { user, updateUser } = useAuth();
	const router = useRouter();

	if (!user) return children;

	const { activeBand, fetchBands } = useBands();
	const tours = activeBand?.tours;

	const setActiveTour = async (tour_id: string) => {
		await updateUser({ active_tour_id: tour_id });
		router.push({ query: {} });
	};

	const createTour = async (tourData: object) => {
		const response = await api.post(`/bands/${activeBand?.id}/tours?include=dates`, tourData);
		const tour: Tour = response.data;
		setActiveTour(tour.id);
		await fetchBands(); // is this the best way?
	};

	const activeTour = tours?.find((tour) => user?.active_tour_id === tour.id);

	return (
		<TourContext.Provider value={{ activeTour, tours, setActiveTour, createTour }}>
			{children}
		</TourContext.Provider>
	);
};

export default TourProvider;

export const useTours = () => useContext<TourContextValues>(TourContext);

export class Tour {
	id = '';
	name = '';
	is_archived = false;
	band_id = '';
	tourusers: Touruser[] = [];
}

export class Touruser {
	id = '';
	banduser_id = '';
	email = '';
	username = '';
	is_admin = false;
}
