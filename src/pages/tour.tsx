import { Box, Button, Fade, IconButton, ListSubheader, Paper, Typography } from '@mui/material';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import DatesDrawer from 'components/core/DatesDrawer/DatesDrawer';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import TourSelector from 'components/tours/TourSelector/TourSelector';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Band } from 'context/bandContext';
import { useDates } from 'context/dateContext';
import Main from 'components/core/Main/Main';
import dayjs from 'dayjs';
import { useTours } from 'context/tourContext';

const TourPage = ({}) => {
	const { activeTour } = useTours();
	const { activeDate, fetchDate, drawerOpen, setDrawerOpen } = useDates();
	const router = useRouter();

	const date_id = router.query.date_id as string;

	useEffect(() => {
		fetchDate(date_id);
	}, [date_id, activeTour]);

	console.log(activeDate);

	const drawerWidth = 300;

	return (
		<PrivatePage
			headerChildren={
				<>
					<BandSelector />
					<TourSelector />
				</>
			}
		>
			<Box display="flex">
				<DatesDrawer width={drawerWidth} />
				<Main drawerWidth={drawerWidth}>
					<Typography padding={2} variant="h6">
						{activeDate && dayjs(activeDate?.date).format('dddd, DD MMMM, YYYY')}
					</Typography>
					<Paper>
						<Box padding={1}>Content</Box>
					</Paper>
				</Main>
			</Box>
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
