import React, { PropsWithChildren, forwardRef } from 'react';
import { AppBar, Box, Hidden, Toolbar } from '@mui/material';
import SideStack from '../../core/SideStack/SideStack';
import { useTheme } from 'context/ThemeContext';

interface HeaderProps extends PropsWithChildren {
	menu?: React.ReactNode;
}

const Header = forwardRef(({ children, menu }: HeaderProps, ref: React.Ref<HTMLDivElement>) => {
	const { theme } = useTheme();
	return (
		<AppBar ref={ref} color="inherit" position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<SideStack justifyContent="start" width="100%">
					{children}
				</SideStack>
				{menu}
			</Toolbar>
		</AppBar>
	);
});

export default Header;
