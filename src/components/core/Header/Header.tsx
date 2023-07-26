import React, { PropsWithChildren, forwardRef } from 'react';
import { AppBar, Hidden, Toolbar } from '@mui/material';
import LoginForm from 'components/auth/LoginForm/LoginForm';
import SideStack from '../SideStack/SideStack';
import { useTheme } from 'context/themeContext';
import MobileHeaderMenu from 'components/menus/MobileHeaderMenu/MobileHeaderMenu';

interface HeaderProps extends PropsWithChildren {
	menu: React.ReactNode;
}

const Header = forwardRef(({ children, menu }: HeaderProps, ref: React.Ref<HTMLDivElement>) => {
	const { theme } = useTheme();
	return (
		<AppBar ref={ref} color="inherit" position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<SideStack justifyContent="start">{children}</SideStack>
				{menu}
				{/* <Hidden mdDown>
					<LoginForm inline />
				</Hidden>
				<Hidden mdUp>
					<MobileHeaderMenu />
				</Hidden> */}
			</Toolbar>
		</AppBar>
	);
});

export default Header;
