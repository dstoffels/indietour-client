import React from 'react';
import Header from '../Header/Header';
import { Box } from '@mui/material';
import Footer from '../Footer/Footer';
import { useTheme } from 'context/ThemeContext';

export interface PageProps extends React.PropsWithChildren {
	headerChildren?: React.ReactNode;
	headerMenu?: React.ReactNode;
	footerChildren?: React.ReactNode;
	navItems?: React.ReactNode;
}
const BasePage = ({
	headerChildren,
	headerMenu,
	footerChildren,
	navItems,
	children,
}: PageProps) => {
	const { headerRef, headerHeight, footerRef, footerHeight } = useTheme();

	return (
		<Box>
			<Header ref={headerRef} menu={headerMenu}>
				{headerChildren}
			</Header>
			<Box
				className="page-content"
				minHeight="100vh"
				paddingTop={`${headerHeight}px`}
				paddingBottom={`${footerHeight}px`}
			>
				{children}
			</Box>
			<Footer ref={footerRef} navItems={navItems}>
				{footerChildren}
			</Footer>
		</Box>
	);
};

export default BasePage;
