import { AppBar, Box, Toolbar } from '@mui/material';
import React, { forwardRef, PropsWithChildren, ReactNode, Ref } from 'react';
import DarkModeSwitch from 'components/theme/DarkModeSwitch/DarkModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import { useTheme } from 'context/ThemeContext';
import BookingToggle from 'components/page/TourModeToggle/TourModeToggle';

interface FooterProps extends PropsWithChildren {
	leftComponent?: ReactNode;
	rightComponent?: ReactNode;
}

const Footer = forwardRef(
	({ children, leftComponent, rightComponent }: FooterProps, ref: Ref<HTMLDivElement>) => {
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
							{leftComponent}
						</Box>
						<Box textAlign="center">{children}</Box>
						<Box>{rightComponent}</Box>
					</SideStack>
				</Toolbar>
			</AppBar>
		);
	},
);

export default Footer;
