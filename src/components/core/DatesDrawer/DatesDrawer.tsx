import {
	Box,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Paper,
	SwipeableDrawer,
	styled,
} from '@mui/material';
import { useState } from 'react';
import SideStack from '../SideStack/SideStack';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const DatesDrawer = ({}) => {
	const [open, setOpen] = useState(true);

	const toggleDrawer = () => setOpen(!open);

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
							<ListItem>Date</ListItem>
						</List>
					</Paper>
				</Box>
			</SwipeableDrawer>
		</>
	);
};

export default DatesDrawer;
