import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';
import DangerZonePanel from 'components/core/Panel/DangerZonePanel';
import MainPage from 'components/page/MainPage/MainPage';
import TourPanel from 'components/tours/PANELS/TourPanel/TourPanel';

const TourPage = ({}) => {
	return (
		<MainPage defaultDateFields={{ status: 'CONFIRMED' }} disableDuplicateDates>
			<TourPanel />
			<DatePanel />
		</MainPage>
	);
};

export default TourPage;
