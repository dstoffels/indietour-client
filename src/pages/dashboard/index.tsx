import { useTheme } from '@emotion/react';
import { Box, Button } from '@mui/material';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import DatesDrawer from 'components/core/DatesDrawer/DatesDrawer';
import SideStack from 'components/core/SideStack/SideStack';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import TourSelector from 'components/tours/TourSelector/TourSelector';
import BandProvider, { Band } from 'context/bandContext';
import TourProvider from 'context/tourContext';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getDashboardProps } from './common';

const DashboardPage = ({ initBands, date_id = '' }: DashboardPageProps) => {
	console.log(date_id);

	const router = useRouter();

	return (
		<BandProvider initBands={initBands}>
			<TourProvider>
				<PrivatePage
					headerChildren={
						<>
							<BandSelector />
							<TourSelector />
						</>
					}
				>
					<SideStack>
						<DatesDrawer />
						{/* <Box>
							<Button onClick={() => router.push('/dashboard/1234')}>Go</Button>
						</Box> */}
					</SideStack>
				</PrivatePage>
			</TourProvider>
		</BandProvider>
	);
};

export const getServerSideProps: GetServerSideProps<{ initBands: Array<Band> }> = async (
	context: GetServerSidePropsContext,
) => getDashboardProps(context);

export interface DashboardPageProps {
	initBands: Array<Band>;
	date_id?: string;
}

export default DashboardPage;
