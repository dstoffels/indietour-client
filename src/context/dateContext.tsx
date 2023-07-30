import { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import api from 'utils/api';
import { useTours } from './tourContext';
import { useRouter } from 'next/router';
import { Dayjs } from 'dayjs';

interface DateContextValues {
	activeDate: TourDate | null;
	dates: TourDate[];
	fetchTourDates: (queryParams?: string) => Promise<void>;
	fetchDate: (date_id: string | undefined) => Promise<void>;
	updateTourdate: (tourdateData: TourDate) => Promise<void>;
	drawerOpen: boolean;
	setDrawerOpen: (open: boolean) => void;
	createTourdate: (tourdateData: TourDate) => Promise<void>;
	statusOptions: string[];
}

interface DateProviderProps extends PropsWithChildren {}

const DateContext = createContext<DateContextValues>({} as DateContextValues);

const DateProvider = ({ children }: DateProviderProps) => {
	const [dates, setDates] = useState<TourDate[]>([]);
	const [activeDate, setActiveDate] = useState<TourDate | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(true);
	const [statusOptions, setStatusOptions] = useState<string[]>([]);
	const { activeTour } = useTours();

	const { push } = useRouter();

	const fetchTourDates = async (queryParams = '') => {
		if (activeTour) {
			const response = await api.get(`/tours/${activeTour?.id}/dates?${queryParams}`);
			setDates(response.data);
		}
	};

	const fetchDate = async (date_id: string | undefined) => {
		if (date_id && activeTour) {
			const response = await api.get(`/dates/${date_id}?include=all`);
			setActiveDate(response.data);
		} else setActiveDate(null);
	};

	const updateTourdate = async (tourdataData: TourDate) => {
		const response = await api.patch(`/dates/${activeDate?.id}`, tourdataData);
		setActiveDate(response.data);
	};

	useEffect(() => {
		setActiveDate(null);
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
				drawerOpen,
				setDrawerOpen,
				createTourdate,
				statusOptions,
				updateTourdate,
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
	shows?: [];
	timeslots?: [];
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
