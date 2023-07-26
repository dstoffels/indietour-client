import React from 'react';
import { Button, MenuItem } from '@mui/material';
import { useAuth } from 'context/authContext';

const LogoutBtn = ({}) => {
	const { user, logout } = useAuth();

	return user && <MenuItem onClick={logout}>Log Out</MenuItem>;
};

export default LogoutBtn;
