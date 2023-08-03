import ContactsPanel from 'components/DATES/PANELS/ContactsPanel/ContactsPanel';
import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';
import LodgingPanel from 'components/DATES/PANELS/LodgingPanel/LodgingPanel';
import SchedulePanel from 'components/DATES/PANELS/SchedulePanel/SchedulePanel';
import DangerZone from 'components/core/DangerZone/DangerZone';
import MainPage from 'components/page/MainPage/MainPage';
import TourPanel from 'components/tours/PANELS/TourPanel/TourPanel';

const TourPage = ({}) => {
	return (
		<MainPage defaultDateFields={{ status: 'CONFIRMED' }} disableDuplicateDates>
			<TourPanel />
			<DatePanel />
			{/* <SchedulePanel /> */}
			<ContactsPanel />
			<LodgingPanel />
		</MainPage>
	);
};

export default TourPage;
