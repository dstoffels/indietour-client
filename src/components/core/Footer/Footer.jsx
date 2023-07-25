import { AppBar, Box, Button, Divider } from '@mui/material';
import React from 'react';
import DarkModeSwitch from 'components/theme/DarkModeSwitch/DarkModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import darkTheme from 'themes/darkTheme';
import DatesDrawerBtn from 'components/DATES/DateDrawerBtn/DateDrawerBtn';

const Footer = ({}) => {
	return (
		<AppBar
			color="inherit"
			position="fixed"
			sx={{ top: 'auto', bottom: 0, zIndex: darkTheme.zIndex.drawer + 1 }}
		>
			<SideStack paddingX={2}>
				<Box>
					<DatesDrawerBtn />
				</Box>
				<Box></Box>
				<Box>
					<DarkModeSwitch />
					<LogoutBtn />
				</Box>
			</SideStack>
		</AppBar>
	);
};

export default Footer;
