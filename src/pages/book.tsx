import * as React from 'react';
import MainPage from 'components/page/MainPage/MainPage';
import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';
import { useTours } from 'context/TourContext';
import { useRouter } from 'next/router';

const BookingPage = ({}) => {
	const { isTourAdmin } = useTours();
	const { push } = useRouter();

	React.useEffect(() => {
		!isTourAdmin && push('/tour');
	}, []);

	return (
		<MainPage>
			<DatePanel />
		</MainPage>
	);
};

export default BookingPage;
