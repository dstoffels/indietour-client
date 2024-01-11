import { Login } from '@mui/icons-material';
import { Hidden, ListItem } from '@mui/material';
import LoginForm from 'components/auth/LoginForm/LoginForm';
import BaseMenu from 'components/core/menu/BaseMenu/BaseMenu';
import * as React from 'react';
import { useState, useEffect } from 'react';

const LoginMenu = () => {
	return (
		<>
			{/* Desktop */}
			<Hidden mdDown>
				<LoginForm inline />
			</Hidden>
			{/* Mobile */}
			<Hidden mdUp>
				<BaseMenu icon={<Login />}>
					<ListItem>
						<LoginForm />
					</ListItem>
				</BaseMenu>
			</Hidden>
		</>
	);
};

export default LoginMenu;
