import {
	Box,
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Paper,
	SwipeableDrawer,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SideStack from '../SideStack/SideStack';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDates } from 'context/dateContext';
import { useRouter } from 'next/router';
import { useTours } from 'context/tourContext';

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

	const dateItems = dates.map((tourDate) => (
		<ListItem onClick={() => router.push(`/tour/${tourDate.id}`)} key={`date-item-${tourDate.id}`}>
			{tourDate.date}
		</ListItem>
	));

	return (
		<SwipeableDrawer
			sx={{ width }}
			anchor="left"
			open={drawerOpen}
			onClose={toggleDrawer}
			onOpen={toggleDrawer}
			swipeAreaWidth={25}
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
		</SwipeableDrawer>
	);
};

export default DatesDrawer;
