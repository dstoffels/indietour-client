import * as React from 'react';
import MainPage from 'components/page/MainPage/MainPage';
import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';
import { useTours } from 'context/TourContext';
import { useRouter } from 'next/router';
import ShowPanel from 'components/DATES/PANELS/ShowPanel/ShowPanel';
import ContactsPanel from 'components/DATES/PANELS/ContactsPanel/ContactsPanel';
import LodgingPanel from 'components/DATES/PANELS/LodgingPanel/LodgingPanel';
import { useAuth } from 'context/AuthContext';

const BookingPage = ({}) => {
	const { isTourAdmin } = useTours();
	const { push } = useRouter();
	const { user } = useAuth();

	React.useEffect(() => {
		(!isTourAdmin || !user?.booking_mode) && push('/tour');
	}, []);

	return (
		<MainPage>
			<DatePanel />
			<ShowPanel />
			<ContactsPanel />
			<LodgingPanel />
		</MainPage>
	);
};

export default BookingPage;
