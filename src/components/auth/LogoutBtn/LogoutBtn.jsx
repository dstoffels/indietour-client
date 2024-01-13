import React from 'react';
import {
	Button,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
} from '@mui/material';
import { useAuth } from 'context/uthContext';
import { Logout } from '@mui/icons-material';
import BaseMenuItem from 'components/core/menu/BaseMenuItem/BaseMenuItem';

const LogoutBtn = ({}) => {
	const { user, logout } = useAuth();
	return (
		user && (
			<BaseMenuItem onClick={logout} icon={<Logout />}>
				Log Out
			</BaseMenuItem>
		)
	);
};

export default LogoutBtn;
