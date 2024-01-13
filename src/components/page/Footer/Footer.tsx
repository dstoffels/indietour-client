import { AppBar, Box, Toolbar } from '@mui/material';
import React, { forwardRef, PropsWithChildren, ReactNode, Ref } from 'react';
import SideStack from 'components/core/SideStack/SideStack';
import { useTheme } from 'context/hemeContext';

interface FooterProps extends PropsWithChildren {
	leftComponent?: ReactNode;
	rightComponent?: ReactNode;
}

const Footer = forwardRef(
	({ children, leftComponent, rightComponent }: FooterProps, ref: Ref<HTMLDivElement>) => {
		const { theme } = useTheme();

		return (
			(children || leftComponent || rightComponent) && (
				<AppBar
					ref={ref}
					color="inherit"
					position="fixed"
					sx={{ top: 'auto', bottom: 0, zIndex: theme.zIndex.drawer + 1 }}
				>
					<Toolbar>
						<SideStack flexBasis="100%" justifyContent="space-between">
							<Box flexGrow={1}>{leftComponent}</Box>
							<Box textAlign="center">{children}</Box>
							<Box flexGrow={1} display="flex" justifyContent="end">
								{rightComponent}
							</Box>
						</SideStack>
					</Toolbar>
				</AppBar>
			)
		);
	},
);

export default Footer;
