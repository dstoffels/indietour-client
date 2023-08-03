import * as React from 'react';
import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import TourSelector from 'components/tours/TourSelector/TourSelector';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {} from 'context/BandContext';
import { useDates } from 'context/DateContext';
import dayjs from 'dayjs';
import { useTours } from 'context/TourContext';
import DatesDrawerBtn from 'components/DATES/DateDrawer/DateDrawerBtn';
import { useTheme } from 'context/ThemeContext';
import { NewDatePropsWithChildren } from 'components/DATES/NewDateForm/NewDateForm';
import DateDrawer from 'components/DATES/DateDrawer/DateDrawer';
import { useGlobals } from 'context/GlobalContext';
import ScheduleDrawerBtn from 'components/DATES/SCHEDULE/ScheduleDrawer/ScheduleDrawerBtn';
import ScheduleDrawer from 'components/DATES/SCHEDULE/ScheduleDrawer/ScheduleDrawer';

export interface MainPageProps extends NewDatePropsWithChildren {}

const MainPage = (props: MainPageProps) => {
	const { children } = props;

	const router = useRouter();
	const { activeTour } = useTours();
	const { activeDate, fetchDate } = useDates();
	const { marginLeft, marginRight, drawerTransition, mainRef } = useGlobals();

	const date_id = router.query.date_id as string;

	useEffect(() => {
		fetchDate();
	}, [date_id, activeTour]);

	return (
		<PrivatePage
			headerChildren={
				<>
					<Hidden smDown>
						<BandSelector />
					</Hidden>
					<TourSelector />
				</>
			}
			footerLeft={<DatesDrawerBtn />}
			footerRight={<ScheduleDrawerBtn></ScheduleDrawerBtn>}
		>
			<Box display="flex">
				<DateDrawer {...props} />
				{
					<Box
						ref={mainRef}
						width="100%"
						marginLeft={marginLeft}
						marginRight={marginRight}
						padding={1}
						sx={{
							transition: drawerTransition,
						}}
					>
						<Box width="100%">
							<Typography padding={2} variant="h6">
								{activeDate && dayjs(activeDate?.date).format('dddd, DD MMMM, YYYY')}
							</Typography>
						</Box>
						<Grid container columnSpacing={1} rowSpacing={2}>
							{children}
						</Grid>
					</Box>
				}
				<ScheduleDrawer />
			</Box>
		</PrivatePage>
	);
};

export default MainPage;
