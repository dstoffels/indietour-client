import { AppBar, Box } from '@mui/material';
import React, { forwardRef, PropsWithChildren, ReactNode, Ref } from 'react';
import DarkModeSwitch from 'components/theme/DarkModeSwitch/DarkModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import { useTheme } from 'context/themeContext';

interface FooterProps extends PropsWithChildren {
	navItems?: ReactNode;
}

const Footer = forwardRef(({ children, navItems }: FooterProps, ref: Ref<HTMLDivElement>) => {
	const { theme } = useTheme();

	return (
		<AppBar
			ref={ref}
			color="inherit"
			position="fixed"
			sx={{ top: 'auto', bottom: 0, zIndex: theme.zIndex.drawer + 1 }}
		>
			<SideStack paddingX={2} justifyContent="space-between">
				<Box>{children}</Box>
				<Box>{navItems}</Box>
				<Box>
					<DarkModeSwitch />
				</Box>
			</SideStack>
		</AppBar>
	);
});

export default Footer;
