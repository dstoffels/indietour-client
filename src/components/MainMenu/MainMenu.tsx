import React from 'react';
import IconMenu from '../core/IconMenu/IconMenu';
import { Divider, MenuItem } from '@mui/material';
import { Menu } from '@mui/icons-material';
import DarkModeSwitch from 'components/theme/DarkModeSwitch/DarkModeSwitch';
import LoginForm from 'components/auth/LoginForm/LoginForm';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import { useAuth } from 'context/authContext';

const MainMenu = ({}) => {
	const { user } = useAuth();
	return (
		user && (
			<IconMenu icon={<Menu />}>
				<LogoutBtn />
			</IconMenu>
		)
	);
};

export default MainMenu;
