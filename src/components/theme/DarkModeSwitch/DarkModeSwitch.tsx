import { IconButton, Tooltip } from '@mui/material';
import { DarkModeOutlined, LightModeTwoTone } from '@mui/icons-material';
import React from 'react';
import { useTheme } from 'context/themeContext';

const DarkModeSwitch = ({}) => {
	const { theme, toggleThemeMode } = useTheme();

	return (
		<Tooltip title={theme.palette.mode !== 'dark' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
			<IconButton onClick={toggleThemeMode}>
				{theme.palette.mode !== 'dark' ? (
					<DarkModeOutlined color="secondary" />
				) : (
					<LightModeTwoTone color="warning" />
				)}
			</IconButton>
		</Tooltip>
	);
};

export default DarkModeSwitch;
