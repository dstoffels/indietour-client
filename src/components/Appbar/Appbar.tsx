import React, { forwardRef } from 'react';
import {
	AppBar,
	Box,
	Button,
	FormControlLabel,
	Grid,
	Hidden,
	IconButton,
	Switch,
	Toolbar,
} from '@mui/material';

import DarkModeSwitch from 'components/DarkModeSwitch/DarkModeSwitch';

const Appbar = forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
	return (
		<AppBar ref={ref} color="inherit" position="fixed">
			<Toolbar>
				<Box flexGrow={1}></Box>
				<Box>
					{/* <FormControlLabel
						label="Dark Mode"
						control={<Switch checked={theme === darkTheme} onClick={toggleMode} />}
					/> */}
					<Hidden smDown>
						<Button>Sign up</Button>
						<Button>Sign in</Button>
					</Hidden>
					<Hidden smUp>
						<IconButton></IconButton>
					</Hidden>
					<DarkModeSwitch />
				</Box>
			</Toolbar>
		</AppBar>
	);
});

export default Appbar;
