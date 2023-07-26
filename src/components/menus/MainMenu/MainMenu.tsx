import React from 'react';
import { useAuth } from 'context/authContext';
import BaseMenu from 'components/core/menu/BaseMenu/BaseMenu';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';

const MainMenu = ({}) => {
	const { user } = useAuth();

	return (
		user && (
			<BaseMenu>
				<LogoutBtn />
			</BaseMenu>
		)
	);
};

export default MainMenu;
