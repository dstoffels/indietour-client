import { Box, Drawer, List, ListSubheader, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import SideStack from '../SideStack/SideStack';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDates } from 'context/dateContext';
import { useRouter } from 'next/router';
import { useTours } from 'context/tourContext';
import DateItem from 'components/DATES/DateItem/DateItem';

interface DrawerProps {
	width: number;
}

const DatesDrawer = ({ width }: DrawerProps) => {
	const { activeTour } = useTours();
	const { dates, activeDate, fetchTourDates, drawerOpen, setDrawerOpen } = useDates();

	const router = useRouter();

	useEffect(() => {
		fetchTourDates();
	}, [activeTour]);

	if (!activeTour) return null;

	const toggleDrawer = () => setDrawerOpen(!open);

	const dateItems = dates.map((tourdate) => (
		<DateItem key={`date-${tourdate.id}`} tourdate={tourdate} activeDate={activeDate} />
	));

	return (
		<Drawer
			sx={{ width }}
			anchor="left"
			open={drawerOpen}
			onClose={toggleDrawer}
			// onOpen={toggleDrawer}
			// swipeAreaWidth={25}
			hideBackdrop
		>
			<Box sx={{ marginTop: '64px', width, height: '100%' }}>
				<Paper sx={{ height: '100%' }}>
					<List
						subheader={
							<ListSubheader>
								<SideStack>
									<Box>Dates</Box>
								</SideStack>
							</ListSubheader>
						}
					>
						{dateItems}
					</List>
				</Paper>
			</Box>
		</Drawer>
	);
};

export default DatesDrawer;
