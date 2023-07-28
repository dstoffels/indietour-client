import { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { User, useAuth } from './authContext';
import api from 'utils/api';
import BandProvider, { Band, useBands } from './bandContext';
import { useTours } from './tourContext';
import { useRouter } from 'next/router';
import dayjs, { Dayjs } from 'dayjs';

interface DateContextValues {
	activeDate: TourDate | null;
	dates: TourDate[];
	fetchTourDates: () => Promise<void>;
	fetchDate: (date_id: string | undefined) => Promise<void>;
	drawerOpen: boolean;
	setDrawerOpen: (open: boolean) => void;
	createTourdate: (tourdateData: TourDate) => Promise<void>;
}

interface DateProviderProps extends PropsWithChildren {}

const DateContext = createContext<DateContextValues>({} as DateContextValues);

const DateProvider = ({ children }: DateProviderProps) => {
	const [dates, setDates] = useState<TourDate[]>([]);
	const [activeDate, setActiveDate] = useState<TourDate | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(true);
	const { activeTour } = useTours();

	const { push } = useRouter();

	const fetchTourDates = async () => {
		if (activeTour) {
			const response = await api.get(`/bands/${activeTour?.band_id}/tours/${activeTour?.id}/dates`);
			setDates(response.data);
		}
	};

	const fetchDate = async (date_id: string | undefined) => {
		if (date_id && activeTour) {
			const response = await api.get(
				`/bands/${activeTour?.band_id}/tours/${activeTour?.id}/dates/${date_id}?include=all`,
			);
			setActiveDate(response.data);
		} else setActiveDate(null);
	};

	useEffect(() => {
		setActiveDate(null);
	}, [activeTour]);

	const createTourdate = async (tourdataData: TourDate) => {
		const response = await api.post(
			`/bands/${activeTour?.band_id}/tours/${activeTour?.id}/dates`,
			tourdataData,
		);
		if (response.data) {
			await fetchTourDates();
			push({ query: { date_id: response.data?.id } });
			// setActiveDate(response.data);
		}
	};

	return (
		<DateContext.Provider
			value={{
				activeDate,
				dates,
				fetchTourDates,
				fetchDate,
				drawerOpen,
				setDrawerOpen,
				createTourdate,
			}}
		>
			{children}
		</DateContext.Provider>
	);
};

export default DateProvider;

export const useDates = () => useContext(DateContext);

export interface TourDate {
	id?: string;
	date: string | Dayjs | Date;
	place?: Place;
	title?: string;
	notes?: string;
	status?: 'UNCONFIRMED' | 'HOLD' | 'INQUIRY SENT' | 'OFFER RECEIVED' | 'CONFIRMED';
	shows?: [];
	timeslots?: [];
	lodgings?: [];
	contacts?: [];
	tour_id?: string;
	place_id?: string;
}

export class Place {
	id = '';
	name = '';
	formatted_address = '';
	political_address = '';
	lat = 0.0;
	lng = 0.0;
	overview = '';
	types: string[] = [];
	business_status = '';
	website = '';
}
