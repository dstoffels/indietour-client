import React from 'react';
import Header from '../Header/Header';
import { Box } from '@mui/material';
import Footer from '../Footer/Footer';
import { useTheme } from 'context/hemeContext';

export interface PageProps extends React.PropsWithChildren {
	headerChildren?: React.ReactNode;
	headerMenu?: React.ReactNode;
	footerLeft?: React.ReactNode;
	footerCenter?: React.ReactNode;
	footerRight?: React.ReactNode;
}
const BasePage = ({
	headerChildren,
	headerMenu,
	footerCenter,
	children,
	footerLeft,
	footerRight,
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
			<Footer ref={footerRef} leftComponent={footerLeft} rightComponent={footerRight}>
				{footerCenter}
			</Footer>
		</Box>
	);
};

export default BasePage;
