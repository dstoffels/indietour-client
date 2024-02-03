import { createContext, useContext, PropsWithChildren } from 'react';
import { useAuth } from './AuthContext';
import api from 'utils/api';
import { useBands } from './BandContext';
import { useRouter } from 'next/router';

interface TourContextValues {
	activeTour: Tour | undefined;
	tours: Tour[] | undefined;
	setActiveTour: (tour_id: string | undefined) => Promise<void>;
	createTour: (tourData: object) => Promise<void>;
	updateTour: (tourData: object) => Promise<void>;
	deleteTour: () => Promise<void>;
	createTouruser: (touruserData: Touruser) => Promise<void>;
	updateTouruser: (touruserData: Touruser) => Promise<void>;
	deleteTouruser: (id: string | undefined) => Promise<void>;
	isTourAdmin: boolean;
	isBandAdmin: boolean;
}

interface TourProviderProps extends PropsWithChildren {}

const TourContext = createContext<TourContextValues>({} as TourContextValues);

const TourProvider = ({ children }: TourProviderProps) => {
	const { user, updateUser } = useAuth();
	const router = useRouter();

	if (!user) return children;

	const { activeBand, fetchBands, isBandAdmin } = useBands();
	const tours = activeBand?.tours;

	const setActiveTour = async (tour_id: string | undefined) => {
		await updateUser({ active_tour_id: tour_id });
		router.push({ query: {} });
	};

	const createTour = async (tourData: object) => {
		const response = await api.post(`/bands/${activeBand?.id}/tours?include=dates`, tourData);
		const tour: Tour = response.data;
		tour && setActiveTour(tour.id);
		await fetchBands();
	};

	const activeTour = tours?.find((tour) => user?.active_tour_id === tour.id);

	const updateTour = async (tourData: object) => {
		const response = await api.patch(`/tours/${activeTour?.id}`, tourData);
		await fetchBands();
	};

	const deleteTour = async () => {
		const response = await api.delete(`/tours/${activeTour?.id}`);
		await fetchBands();
	};

	const createTouruser = async (touruserData: Touruser) => {
		await api.post(`/tours/${activeTour?.id}/users`, touruserData);
		await fetchBands();
	};

	const updateTouruser = async (touruserData: Touruser) => {
		await api.patch(`/tours/${activeTour?.id}/users/${touruserData.id}`, touruserData);
		await fetchBands();
	};

	const deleteTouruser = async (id: string | undefined) => {
		await api.delete(`/tours/${activeTour?.id}/users/${id}`);
		await fetchBands();
	};

	const isTourAdmin = user.is_tour_admin as boolean;

	return (
		<TourContext.Provider
			value={{
				activeTour,
				tours,
				setActiveTour,
				createTour,
				updateTour,
				deleteTour,
				createTouruser,
				updateTouruser,
				deleteTouruser,
				isTourAdmin,
				isBandAdmin,
			}}
		>
			{children}
		</TourContext.Provider>
	);
};

export default TourProvider;

export const useTours = () => useContext<TourContextValues>(TourContext);

export interface Tour {
	id?: string;
	name?: string;
	is_archived?: boolean;
	band_id?: string;
	tourusers?: Touruser[];
}

export interface Touruser {
	id?: string;
	banduser_id?: string;
	email?: string;
	username?: string;
	is_admin?: boolean;
}
