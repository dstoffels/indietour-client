import * as React from 'react';
import MainPage from 'components/page/MainPage/MainPage';
import DatePanel from 'components/DATES/DatePanel/DatePanel';

const BookingPage = ({}) => {
	return (
		<MainPage queryParams="">
			<DatePanel />
			<DatePanel />
			<DatePanel />
			<DatePanel />
			<DatePanel />
			<DatePanel />
		</MainPage>
	);
};

export default BookingPage;
