import React, { PropsWithChildren, ReactPropTypes, forwardRef } from 'react';
import { AppBar, Box, Button, Hidden, Toolbar } from '@mui/material';

import IconMenu from 'components/core/IconMenu/IconMenu';
import MainMenu from 'components/MainMenu/MainMenu';
import LoginForm from 'components/auth/LoginForm/LoginForm';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import SideStack from '../SideStack/SideStack';
import { useTheme } from 'context/themeContext';

const Header = forwardRef(({ children }: PropsWithChildren, ref: React.Ref<HTMLDivElement>) => {
	const { theme } = useTheme();
	return (
		<AppBar ref={ref} color="inherit" position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<SideStack justifyContent="start">{children}</SideStack>
				<Hidden mdDown>
					<LoginForm inline />
				</Hidden>
				<Hidden mdUp></Hidden>
				<MainMenu />
			</Toolbar>
		</AppBar>
	);
});

export default Header;
