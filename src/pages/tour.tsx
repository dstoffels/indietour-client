import { Box, Hidden, Typography } from '@mui/material';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import DatesDrawer from 'components/DATES/DatesDrawer/DatesDrawer';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import TourSelector from 'components/tours/TourSelector/TourSelector';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import { Band } from 'context/bandContext';
import { useDates } from 'context/dateContext';
import Main from 'components/core/Main/Main';
import dayjs from 'dayjs';
import { useTours } from 'context/tourContext';
import DatesDrawerBtn from 'components/DATES/DateDrawerBtn/DateDrawerBtn';

const TourPage = ({}) => {
	const { activeTour } = useTours();
	const { activeDate, fetchDate } = useDates();
	const router = useRouter();

	const date_id = router.query.date_id as string;

	useEffect(() => {
		fetchDate(date_id);
	}, [date_id, activeTour]);

	// console.log(activeDate);

	const drawerWidth = 300;

	return (
		<PrivatePage
			headerChildren={
				<>
					<Hidden mdDown>
						<BandSelector />
					</Hidden>
					<TourSelector />
				</>
			}
			footerChildren={<DatesDrawerBtn />}
		>
			<Box display="flex">
				<DatesDrawer width={drawerWidth} />
				<Main drawerWidth={drawerWidth}>
					<Typography padding={2} variant="h6">
						{activeDate && dayjs(activeDate?.date).format('dddd, DD MMMM, YYYY')}
					</Typography>
				</Main>
			</Box>
		</PrivatePage>
	);
};

export interface DashboardPageProps extends PropsWithChildren {
	initBands: Array<Band>;
}

export default TourPage;
