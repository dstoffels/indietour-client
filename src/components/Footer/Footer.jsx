import { AppBar, Box, Button, Divider } from '@mui/material';
import React from 'react';
import DarkModeSwitch from 'components/DarkModeSwitch/DarkModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import LogoutBtn from 'components/LogoutBtn/LogoutBtn';
import { useRouter } from 'next/router';

const Footer = ({}) => {
	const { push } = useRouter();
	const handleHome = () => push('/');

	return (
		<AppBar color="inherit" position="fixed" sx={{ top: 'auto', bottom: 0 }}>
			<SideStack paddingX={2}>
				<Box flexGrow={1}>
					<Button onClick={handleHome}>Home</Button>
				</Box>
				<LogoutBtn />
				<DarkModeSwitch />
			</SideStack>
		</AppBar>
	);
};

export default Footer;
