import { AppBar, Box, Button, Divider } from '@mui/material';
import React, { forwardRef, Ref } from 'react';
import DarkModeSwitch from 'components/theme/DarkModeSwitch/DarkModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import DatesDrawerBtn from 'components/DATES/DateDrawerBtn/DateDrawerBtn';
import { useRouter } from 'next/router';
import { useTheme } from 'context/themeContext';

const Footer = forwardRef(({}, ref: Ref<HTMLDivElement>) => {
	const { theme } = useTheme();
	const { push } = useRouter();

	return (
		<AppBar
			ref={ref}
			color="inherit"
			position="fixed"
			sx={{ top: 'auto', bottom: 0, zIndex: theme.zIndex.drawer + 1 }}
		>
			<SideStack paddingX={2}>
				<Box>
					<DatesDrawerBtn />
				</Box>
				<Box></Box>
				<Box>
					<Button onClick={() => push('/account')}>account</Button>
					<DarkModeSwitch />
					<LogoutBtn />
				</Box>
			</SideStack>
		</AppBar>
	);
});

export default Footer;
