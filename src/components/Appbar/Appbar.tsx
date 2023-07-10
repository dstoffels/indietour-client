import React, { forwardRef } from 'react';
import { AppBar, Box, Button, Hidden, Toolbar } from '@mui/material';

import DarkModeSwitch from 'components/DarkModeSwitch/DarkModeSwitch';
import IconMenu from 'components/core/IconMenu/IconMenu';
import MainMenu from 'components/MainMenu/MainMenu';
import LoginForm from 'components/forms/LoginForm/LoginForm';

const Appbar = forwardRef(({}, ref: React.Ref<HTMLDivElement>) => {
	return (
		<AppBar ref={ref} color="inherit" position="fixed">
			<Toolbar>
				<Box flexGrow={1}></Box>
				<Box>
					<Hidden smDown>
						<Button>Sign up</Button>
						<LoginForm inline />
						<DarkModeSwitch />
					</Hidden>
					<Hidden smUp>
						<MainMenu />
					</Hidden>
				</Box>
			</Toolbar>
		</AppBar>
	);
});

export default Appbar;
