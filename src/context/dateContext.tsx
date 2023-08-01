import { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import api from 'utils/api';
import { useTours } from './tourContext';
import { useRouter } from 'next/router';
import { Dayjs } from 'dayjs';

interface DateContextValues {
	activeDate: TourDate | null;
	dates: TourDate[];
	fetchTourDates: () => Promise<void>;
	fetchDate: (date_id: string | undefined) => Promise<void>;
	updateTourdate: (tourdateData: TourDate) => Promise<void>;
	drawerOpen: boolean;
	setDrawerOpen: (open: boolean) => void;
	createTourdate: (tourdateData: TourDate) => Promise<void>;
	statusOptions: string[];
	isTourAdmin: boolean;
}

interface DateProviderProps extends PropsWithChildren {}

const DateContext = createContext<DateContextValues>({} as DateContextValues);

const DateProvider = ({ children }: DateProviderProps) => {
	const [dates, setDates] = useState<TourDate[]>([]);
	const [activeDate, setActiveDate] = useState<TourDate | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(true);
	const [statusOptions, setStatusOptions] = useState<string[]>([]);
	const { activeTour, isTourAdmin } = useTours();

	const { push, query } = useRouter();

	const fetchTourDates = async () => {
		if (activeTour) {
			const statusQuery: string | undefined = query.status && `status=${query.status}`;
			console.log('fetchTourDates', statusQuery);
			const response = await api.get(`/tours/${activeTour?.id}/dates?${statusQuery}`);
			setDates(response.data);
		}
	};

	const fetchDate = async (date_id: string | undefined) => {
		if (date_id && activeTour) {
			console.log('FetchDate');
			const response = await api.get(`/dates/${date_id}?include=all`);
			setActiveDate(response.data);
		} else setActiveDate(null);
	};

	const updateTourdate = async (tourdataData: TourDate) => {
		if (activeDate) {
			console.log('UpdateDate');

			const response = await api.patch(`/dates/${activeDate.id}`, tourdataData);
			setActiveDate(response.data);
			await fetchTourDates();
		}
	};

	useEffect(() => {
		if (activeTour) {
			setActiveDate(null);
		}
	}, [activeTour]);

	const fetchStatusOptions = async () => {
		console.log('fetchoptions');
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
