import React from 'react';
import IconMenu from '../core/IconMenu/IconMenu';
import { Divider, MenuItem } from '@mui/material';
import { Menu } from '@mui/icons-material';
import DarkModeSwitch from 'components/theme/DarkModeSwitch/DarkModeSwitch';
import LoginForm from 'components/auth/LoginForm/LoginForm';

const MainMenu = ({}) => {
	return (
		<IconMenu icon={<Menu />}>
			<LoginForm />
			<MenuItem>Sign Up</MenuItem>
			<Divider />
			<DarkModeSwitch />
		</IconMenu>
	);
};

export default MainMenu;
