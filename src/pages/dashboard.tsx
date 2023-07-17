import BandSelector from 'components/bands/BandSelector/BandSelector';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import BandProvider, { Band } from 'context/bandContext';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const DashboardPage = ({ initBands }: DashboardPageProps) => {
	return (
		<BandProvider initBands={initBands}>
			<PrivatePage headerChildren={<BandSelector />}>Dashboard</PrivatePage>
		</BandProvider>
	);
};

export const getServerSideProps: GetServerSideProps<{ initBands: Array<Band> }> = async (
	context: GetServerSidePropsContext,
) => {
	const { req } = context;
	const response = await fetch('http://127.0.0.1:8000/api/bands', {
		method: 'GET',
		headers: {
			Cookie: Object.entries(req.cookies)
				.map(([key, value]) => `${key}=${value}`)
				.join('; '),
		},
	});

	const initBands = await response.json();

	return { props: { initBands } };
};

interface DashboardPageProps {
	initBands: Array<Band>;
}

export default DashboardPage;
