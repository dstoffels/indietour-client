import React from 'react';
import { AppBar, Box, Button, FormControlLabel, Grid, Switch, Toolbar } from '@mui/material';
import { useTheme } from 'context/globalContext';
import darkTheme from 'themes/darkTheme.js';

const Appbar = React.forwardRef(({}, ref) => {
	const { theme, toggleMode } = useTheme();

	return (
		<AppBar ref={ref} position="fixed">
			<Toolbar>
				{/* <FormControlLabel
					label="Dark Mode"
					control={<Switch checked={theme === darkTheme} onClick={toggleMode} />}
				/> */}
				<Box flexGrow={1}></Box>
				<Box></Box>
				<Box>
					<Button>Sign up</Button>
					<Button>Sign in</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
});

export default Appbar;
