import { Box, Drawer, List, ListSubheader, Paper, SwipeableDrawer } from '@mui/material';
import { useEffect, useState } from 'react';
import SideStack from '../../core/SideStack/SideStack';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDates } from 'context/dateContext';
import { useRouter } from 'next/router';
import { useTours } from 'context/tourContext';
import DateItem from 'components/DATES/DateItem/DateItem';
import { useTheme } from 'context/themeContext';
import DatePicker from 'components/core/DatePicker/DatePicker';
import NewDateForm from '../NewDateForm/NewDateForm';

interface DrawerProps {
	width: number;
}

const DatesDrawer = ({ width }: DrawerProps) => {
	const { theme, headerHeight, footerHeight } = useTheme();
	const { activeTour } = useTours();
	const { dates, activeDate, fetchTourDates, drawerOpen, setDrawerOpen } = useDates();

	useEffect(() => {
		fetchTourDates();
	}, [activeTour]);

	if (!activeTour) return null;

	const toggleDrawer = () => setDrawerOpen(!drawerOpen);

	const dateItems = dates.map((tourdate) => (
		<DateItem key={`date-${tourdate.id}`} tourdate={tourdate} activeDate={activeDate} />
	));

	return (
		<Drawer
			sx={{ zIndex: theme.zIndex.drawer - 1 }}
			anchor="left"
			open={drawerOpen}
			onClose={toggleDrawer}
			hideBackdrop
		>
			<Box
				sx={{
					marginTop: `${headerHeight}px`,
					marginBottom: `${footerHeight}px`,
					height: '100%',
				}}
			>
				<Paper sx={{ height: '100%' }}>
					<List subheader={<NewDateForm />}>{dateItems}</List>
				</Paper>
			</Box>
		</Drawer>
	);
};

export default DatesDrawer;
