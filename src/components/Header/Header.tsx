import React, { PropsWithChildren, ReactPropTypes, forwardRef } from 'react';
import { AppBar, Box, Button, Hidden, Toolbar } from '@mui/material';

import DarkModeSwitch from 'components/DarkModeSwitch/DarkModeSwitch';
import IconMenu from 'components/core/IconMenu/IconMenu';
import MainMenu from 'components/MainMenu/MainMenu';
import LoginForm from 'components/forms/LoginForm/LoginForm';
import LogoutBtn from 'components/LogoutBtn/LogoutBtn';

const Header = forwardRef(({ children }: PropsWithChildren, ref: React.Ref<HTMLDivElement>) => {
	return (
		<AppBar ref={ref} color="inherit" position="fixed">
			<Toolbar>
				<Box flexGrow={1}>{children}</Box>
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
