import * as React from 'react';
import MainPage from 'components/page/MainPage/MainPage';
import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';

const BookingPage = ({}) => {
	return (
		<MainPage fetchDatesQuery="">
			<DatePanel />
		</MainPage>
	);
};

export default BookingPage;
