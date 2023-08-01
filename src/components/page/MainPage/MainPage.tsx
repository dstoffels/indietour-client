import * as React from 'react';
import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import PersistentDrawer from 'components/DATES/DateDrawer/PersistentDrawer';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import TourSelector from 'components/tours/TourSelector/TourSelector';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Band } from 'context/BandContext';
import { TourDate, useDates } from 'context/DateContext';
import Main from 'components/core/MainDEP/Main';
import dayjs from 'dayjs';
import { useTours } from 'context/TourContext';
import DatesDrawerBtn from 'components/DATES/DateDrawerBtn/DateDrawerBtn';
import { useTheme } from 'context/ThemeContext';
import { NewDatePropsWithChildren } from 'components/DATES/NewDateForm/NewDateForm';
import DateDrawer from 'components/DATES/DateDrawer/DateDrawer';
import PastDatesSwitch from 'components/DATES/PastDatesSwitch/PastDatesSwitch';

export interface MainPageProps extends NewDatePropsWithChildren {}

const MainPage = (props: MainPageProps) => {
	const { children } = props;

	const router = useRouter();
	const { activeTour } = useTours();
	const { drawerOpen, activeDate, fetchDate } = useDates();
	const { theme } = useTheme();

	const [drawerWidth, setDrawerWidth] = useState<number>(0);

	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const drawerRef = useRef<HTMLElement | null>(null);

	const date_id = router.query.date_id as string;

	useEffect(() => {
		fetchDate(date_id);
	}, [date_id, activeTour]);

	useEffect(() => {
		if (drawerRef.current) {
			setDrawerWidth(drawerRef.current.clientWidth);
		}
	}, [drawerRef.current]);

	const marginLeft = !isMobile && drawerOpen ? `${drawerWidth}px` : 0;

	const transition = !drawerOpen
		? theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
		  })
		: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
		  });

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
			footerChildren={
				<>
					<DatesDrawerBtn />
				</>
			}
		>
			<Box display="flex">
				<DateDrawer ref={drawerRef} {...props} />
				{
					<Box
						width="100%"
						marginLeft={marginLeft}
						padding={1}
						sx={{
							transition,
						}}
					>
						<Box width="100%">
							<Typography padding={2} variant="h6">
								{activeDate && dayjs(activeDate?.date).format('dddd, DD MMMM, YYYY')}
							</Typography>
						</Box>
						<Grid container spacing={1}>
							{children}
						</Grid>
					</Box>
				}
			</Box>
		</PrivatePage>
	);
};

export default MainPage;
