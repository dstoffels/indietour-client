import { Box, Button } from '@mui/material';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import DatesDrawer from 'components/core/DatesDrawer/DatesDrawer';
import SideStack from 'components/core/SideStack/SideStack';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import TourSelector from 'components/tours/TourSelector/TourSelector';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import { Band } from 'context/bandContext';
import { useDates } from 'context/dateContext';

const TourPage = ({}) => {
	const { activeDate, fetchDate } = useDates();
	const router = useRouter();

	let { date_id } = router.query;

	useEffect(() => {
		date_id && fetchDate(date_id);
	}, [date_id]);

	return (
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
				<Box>{activeDate?.place.formatted_address}</Box>
			</SideStack>
		</PrivatePage>
	);
};

// export const getServerSideProps: GetServerSideProps<{ initBands: Array<Band> }> = async (
// 	context: GetServerSidePropsContext,
// ) => getDashboardProps(context);

export interface DashboardPageProps extends PropsWithChildren {
	initBands: Array<Band>;
}

export default TourPage;
