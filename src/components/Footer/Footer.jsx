import { AppBar, Box } from '@mui/material';
import React from 'react';
import DarkModeSwitch from 'components/DarkModeSwitch/DarkModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import LogoutBtn from 'components/LogoutBtn/LogoutBtn';

const Footer = ({}) => {
	return (
		<AppBar color="inherit" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
			<SideStack>
				<Box></Box>
				<Box>
					{/* <LogoutBtn /> */}
					<DarkModeSwitch />
				</Box>
			</SideStack>
		</AppBar>
	);
};

export default Footer;
