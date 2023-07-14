import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from 'context/authContext';

const LogoutBtn = ({}) => {
	const { user, loading, logout } = useAuth();

	return user && <Button onClick={logout}>Log Out</Button>;
};

export default LogoutBtn;
