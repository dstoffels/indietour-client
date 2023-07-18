import { AppBar, Box, Button, Divider } from '@mui/material';
import React from 'react';
import DarkModeSwitch from 'components/theme/DarkModeSwitch/DarkModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import { useRouter } from 'next/router';
import darkTheme from 'themes/darkTheme';

const Footer = ({}) => {
	const { push } = useRouter();
	const handleHome = () => push('/');

	return (
		<AppBar
			color="inherit"
			position="fixed"
			sx={{ top: 'auto', bottom: 0, zIndex: darkTheme.zIndex.drawer + 1 }}
		>
			<SideStack paddingX={2}>
				<Box flexGrow={1}></Box>
				<DarkModeSwitch />
				<LogoutBtn />
			</SideStack>
		</AppBar>
	);
};

export default Footer;
