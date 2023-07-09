import { IconButton, Tooltip } from '@mui/material';
import { DarkModeOutlined, LightModeTwoTone } from '@mui/icons-material';
import React from 'react';
import { useTheme } from 'context/globalContext';
import darkTheme from 'themes/darkTheme.js';

const DarkModeSwitch = ({}) => {
	const { theme, toggleMode } = useTheme();

	return (
		<Tooltip title={theme !== darkTheme ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
			<IconButton onClick={toggleMode}>
				{theme !== darkTheme ? (
					<DarkModeOutlined color="secondary" />
				) : (
					<LightModeTwoTone color="warning" />
				)}
			</IconButton>
		</Tooltip>
	);
};

export default DarkModeSwitch;
