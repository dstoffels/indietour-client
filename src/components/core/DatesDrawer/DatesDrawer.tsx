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

const DatesDrawer = ({}) => {
	const { activeTour } = useTours();
	const { dates, activeDate, fetchTourDates } = useDates();
	const router = useRouter();

	const [open, setOpen] = useState(true);

	useEffect(() => {
		fetchTourDates();
	}, []);

	if (!activeTour) return null;

	const toggleDrawer = () => setOpen(!open);

	const dateItems = dates.map((tourDate) => (
		<ListItem onClick={() => router.push(`/tour/${tourDate.id}`)} key={`date-item-${tourDate.id}`}>
			{tourDate.date}
		</ListItem>
	));

	return (
		<>
			<SwipeableDrawer
				sx={{ width: 250 }}
				anchor="left"
				open={open}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}
				swipeAreaWidth={25}
				hideBackdrop
			>
				<Box sx={{ marginTop: '64px', width: 250, height: '100%' }}>
					<Paper sx={{ height: '100%' }}>
						<List
							subheader={
								<ListSubheader>
									<SideStack>
										<Box>Dates</Box>
										<IconButton onClick={toggleDrawer}>
											<ChevronLeft />
										</IconButton>
									</SideStack>
								</ListSubheader>
							}
						>
							{dateItems}
						</List>
					</Paper>
				</Box>
			</SwipeableDrawer>
		</>
	);
};

export default DatesDrawer;
