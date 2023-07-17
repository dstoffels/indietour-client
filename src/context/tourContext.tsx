import { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { User, useAuth } from './authContext';
import api from 'utils/api';
import BandProvider, { Band, useBands } from './bandContext';

interface TourContextProps {
	activeTour: Tour | undefined;
	tours: Tour[] | undefined;
	// fetchTours: () => Promise<void>;
	setActiveTour: (tour_id: string) => Promise<void>;
	createTour: (tourData: object) => Promise<void>;
}

interface TourProviderProps extends PropsWithChildren {
	// initBands: Band[];
}

const TourContext = createContext<TourContextProps>({} as TourContextProps);

const TourProvider = ({ children }: TourProviderProps) => {
	const { user, updateUser } = useAuth();
	const { activeBand, fetchBands } = useBands();
	const tours = activeBand?.tours;

	const setActiveTour = async (tour_id: string) => {
		await updateUser({ active_tour_id: tour_id });
	};

	const createTour = async (tourData: object) => {
		const response = await api.post(`/bands/${activeBand?.id}/tours`, tourData);
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

export const useTours = () => useContext<TourContextProps>(TourContext);

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
