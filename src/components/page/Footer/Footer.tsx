import { AppBar, Box, Toolbar } from '@mui/material';
import React, { forwardRef, PropsWithChildren, ReactNode, Ref } from 'react';
import DarkModeSwitch from 'components/theme/DarkModeSwitch/DarkModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import { useTheme } from 'context/ThemeContext';
import BookingToggle from 'components/page/TourModeToggle/TourModeToggle';

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
			<Toolbar>
				<SideStack flexBasis="100%" justifyContent="space-between">
					<Box display="flex" gap={2}>
						{children}
					</Box>
					<Box textAlign="center">
						<BookingToggle />
					</Box>
					<Box>
						<DarkModeSwitch />
					</Box>
				</SideStack>
			</Toolbar>
		</AppBar>
	);
});

export default Footer;
