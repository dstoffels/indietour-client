import * as React from 'react';
import { useEffect } from 'react';

import MainPage from 'components/page/MainPage/MainPage';
import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';
import { useTours } from 'context/TourContext';
import { useRouter } from 'next/router';
import ShowPanel from 'components/DATES/PANELS/ShowPanel/ShowPanel';
import ContactsPanel from 'components/DATES/PANELS/ContactsPanel/ContactsPanel';
import LodgingPanel from 'components/DATES/PANELS/LodgingPanel/LodgingPanel';
import { useAuth } from 'context/AuthContext';
import { useDates } from 'context/DateContext';
import BandPanel from 'components/bands/BandPanel/BandPanel';
import TourPanel from 'components/tours/TourPanel/TourPanel';

const BookingPage = ({}) => {
	const { isTourAdmin } = useTours();
	// const { activeDate } = useDates();

	const { push } = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		(!isTourAdmin || !user?.booking_mode) && push('/tour');
	}, []);

	return (
		<MainPage>
			{/* TOUR */}
			<BandPanel />
			<TourPanel />
			<DatePanel />
			<ShowPanel />
			{/* <ContactsPanel /> */}
			{/* <LodgingPanel /> */}
		</MainPage>
	);
};

export default BookingPage;
