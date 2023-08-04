import ContactsPanel from 'components/DATES/PANELS/ContactsPanel/ContactsPanel';
import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';
import LodgingPanel from 'components/DATES/PANELS/LodgingPanel/LodgingPanel';
import BandPanel from 'components/bands/BandPanel/BandPanel';
import MainPage from 'components/page/MainPage/MainPage';
import TourPanel from 'components/tours/TourPanel/TourPanel';

const TourPage = ({}) => {
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
