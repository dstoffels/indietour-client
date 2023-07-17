import React, { PropsWithChildren, ReactPropTypes, forwardRef } from 'react';
import { AppBar, Box, Button, Hidden, Toolbar } from '@mui/material';

import IconMenu from 'components/core/IconMenu/IconMenu';
import MainMenu from 'components/MainMenu/MainMenu';
import LoginForm from 'components/auth/LoginForm/LoginForm';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import SideStack from '../SideStack/SideStack';

const Header = forwardRef(({ children }: PropsWithChildren, ref: React.Ref<HTMLDivElement>) => {
	return (
		<AppBar ref={ref} color="inherit" position="fixed">
			<Toolbar>
				<SideStack justifyContent="start">{children}</SideStack>
				<Box>
					<Hidden smDown>
						<LoginForm inline />
					</Hidden>
					<Hidden smUp>
						<MainMenu />
					</Hidden>
				</Box>
			</Toolbar>
		</AppBar>
	);
});

export default Header;
