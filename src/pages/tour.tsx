import MainPage from 'components/page/MainPage/MainPage';

const TourPage = ({}) => {
	return (
		<MainPage queryParams="status=confirmed,cancelled" defaultDateFields={{ status: 'CONFIRMED' }}>
			CONTENT HERE
		</MainPage>
	);
};

export default TourPage;
