import React, { PropsWithChildren, forwardRef } from 'react';
import { AppBar, Hidden, Toolbar } from '@mui/material';
import SideStack from '../../core/SideStack/SideStack';
import { useTheme } from 'context/themeContext';

interface HeaderProps extends PropsWithChildren {
	menu?: React.ReactNode;
	navItems?: React.ReactNode;
}

const Header = forwardRef(
	({ children, menu, navItems }: HeaderProps, ref: React.Ref<HTMLDivElement>) => {
		const { theme } = useTheme();
		return (
			<AppBar ref={ref} color="inherit" position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<SideStack justifyContent="start">{children}</SideStack>
					{/* <SideStack justifyContent="start">{navItems}</SideStack> */}
					{menu}
				</Toolbar>
			</AppBar>
		);
	},
);

export default Header;
