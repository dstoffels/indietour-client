import DatePanel from 'components/DATES/PANELS/DatePanel/DatePanel';
import DangerZonePanel from 'components/core/Panel/DangerZonePanel';
import MainPage from 'components/page/MainPage/MainPage';

const TourPage = ({}) => {
	return (
		<MainPage defaultDateFields={{ status: 'CONFIRMED' }} disableDuplicateDates>
			<DatePanel />
			<DangerZonePanel
				deleteBtnText="Delete Tour"
				confirmationText="Tour Name"
				popoverText=""
			></DangerZonePanel>
		</MainPage>
	);
};

export default TourPage;
