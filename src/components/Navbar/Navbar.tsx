import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Schedule, DateRange, EditCalendar } from '@mui/icons-material';

const Navbar = ({}) => {
	return (
		<BottomNavigation showLabels>
			<BottomNavigationAction label="Today" icon={<Schedule fontSize="large" />} />
			<BottomNavigationAction label="Tour" icon={<DateRange fontSize="large" />} />
			<BottomNavigationAction label="Booking" icon={<EditCalendar fontSize="large" />} />
		</BottomNavigation>
		//         <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
		// </Paper>
	);
};

export default Navbar;
