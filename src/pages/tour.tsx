import DatePanel from 'components/DATES/DatePanel/DatePanel';
import MainPage from 'components/page/MainPage/MainPage';

const TourPage = ({}) => {
	return (
		<MainPage
			fetchDatesQuery="status=confirmed,cancelled"
			defaultDateFields={{ status: 'CONFIRMED' }}
		>
			<DatePanel />
		</MainPage>
	);
};

export default TourPage;
