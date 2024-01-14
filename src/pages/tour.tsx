import ContactsPanel from 'components/DATES/PANELS/ContactsPanel/ContactsPanel';
import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';
import LodgingPanel from 'components/DATES/PANELS/LodgingPanel/LodgingPanel';
import BandPanel from 'components/bands/BandPanel/BandPanel';
import MainPage from 'components/page/MainPage/MainPage';
import TourPanel from 'components/tours/TourPanel/TourPanel';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

const TourPage = ({}) => {
	const { user } = useAuth();
	const { push } = useRouter();

	useEffect(() => {
		user?.is_tour_admin && user.booking_mode && push('/book');
	}, []);

	return (
		<MainPage defaultDateFields={{ status: 'CONFIRMED' }} disableDuplicateDates>
			{/* TOUR */}
			<BandPanel />
			<TourPanel />
			{/* DATES */}
			<ContactsPanel />
			<LodgingPanel />
			<DatePanel />
		</MainPage>
	);
};

export default TourPage;
