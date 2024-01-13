import { createContext, useState, useContext, useEffect, PropsWithChildren, useRef } from 'react';
import api from 'utils/api';
import { useTours } from './ourContext';
import { useRouter } from 'next/router';
import dayjs, { Dayjs } from 'dayjs';
import { useAuth } from './AuthContext';
import { Timeslot } from 'hooks/useSchedule';
import { useMediaQuery } from '@mui/material';
import { useTheme } from './ThemeContext';

interface DateContextValues {
	activeDate: TourDate | null;
	dates: TourDate[];
	fetchTourDates: () => Promise<void>;
	fetchDate: () => Promise<void>;
	updateTourdate: (tourdateData: TourDate) => Promise<void>;
	deleteTourdate: () => Promise<void>;
	createTourdate: (tourdateData: TourDate) => Promise<void>;
	statusOptions: string[];
	isTourAdmin: boolean;
}

interface DateProviderProps extends PropsWithChildren {}

const DateContext = createContext<DateContextValues>({} as DateContextValues);

const DateProvider = ({ children }: DateProviderProps) => {
	const { user } = useAuth();

	const [dates, setDates] = useState<TourDate[]>([]);
	const [activeDate, setActiveDate] = useState<TourDate | null>(null);
	const [statusOptions, setStatusOptions] = useState<string[]>([]);
	const { activeTour, isTourAdmin } = useTours();

	const { push, pathname, query } = useRouter();
	const date_id = query.date_id as string;

	const fetchTourDates = async () => {
		if (activeTour) {
			const statusQuery: string = pathname === '/tour' ? 'status=confirmed,cancelled' : '';
			const response = await api.get(
				`/tours/${activeTour?.id}/dates?${statusQuery}&past_dates=${
					user?.show_past_dates
				}&request_date=${dayjs().format('YYYY-MM-DD')}`,
			);
			setDates(response.data);
		}
	};

	const fetchDate = async () => {
		if (activeTour && date_id) {
			const response = await api.get(`/dates/${date_id}?include=all`);
			setActiveDate(response.data);
		} else setActiveDate(null);
	};

	const updateTourdate = async (tourdateData: TourDate) => {
		if (activeDate) {
			const response = await api.patch(`/dates/${activeDate.id}`, tourdateData);
			setActiveDate(response.data);
			await fetchTourDates();
		}
	};

	const deleteTourdate = async () => {
		const response = await api.delete(`/dates/${activeDate?.id}`);
		push({ query: {} });
		await fetchTourDates();
	};

	useEffect(() => {
		if (activeTour) {
			setActiveDate(null);
		}
	}, [activeTour]);

	const fetchStatusOptions = async () => {
		const response = await api.get('/dates/status');
		setStatusOptions(response.data);
	};

	useEffect(() => {
		fetchStatusOptions();
	}, []);

	const createTourdate = async (tourdataData: TourDate) => {
		const response = await api.post(`/tours/${activeTour?.id}/dates`, tourdataData);
		if (response.data) {
			await fetchTourDates();
			setActiveDate(response.data);
			push({ query: { date_id: response.data?.id } });
		}
	};

	return (
		<DateContext.Provider
			value={{
				activeDate,
				dates,
				fetchTourDates,
				fetchDate,
				createTourdate,
				statusOptions,
				updateTourdate,
				deleteTourdate,
				isTourAdmin,
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
	date?: string | Dayjs | Date;
	place?: Place;
	title?: string;
	notes?: string;
	status?: TourDateStatusOptions;
	hold?: number;
	shows?: [];
	timeslots?: Timeslot[];
	lodgings?: [];
	contacts?: [];
	tour_id?: string;
	place_id?: string;
}

export type TourDateStatusOptions =
	| 'PROSPECT'
	| 'INQUIRED'
	| 'HOLD'
	| 'CHALLENGED'
	| 'RELEASED'
	| 'OPTION'
	| 'CONFIRMED'
	| 'CANCELLED';

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
