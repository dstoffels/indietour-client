import { Box, Button, Fade, IconButton, ListSubheader, Paper, Typography } from '@mui/material';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import DatesDrawer from 'components/core/DatesDrawer/DatesDrawer';
import SideStack from 'components/core/SideStack/SideStack';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import TourSelector from 'components/tours/TourSelector/TourSelector';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Band } from 'context/bandContext';
import { useDates } from 'context/dateContext';
import Main from 'components/core/Main/Main';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const TourPage = ({}) => {
	const { activeDate, fetchDate, drawerOpen, setDrawerOpen } = useDates();
	const router = useRouter();

	let date_id: string | undefined = router.query.date_id as string;

	useEffect(() => {
		date_id && fetchDate(date_id);
	}, [date_id]);

	console.log(activeDate);

	const drawerWidth = 250;

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