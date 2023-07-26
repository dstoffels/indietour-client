import React, { Ref, useEffect, useRef, useState } from 'react';
import Header from '../../core/Header/Header';
import { Box } from '@mui/material';
import Footer from 'components/core/Footer/Footer';
import { useTheme } from 'context/themeContext';

export interface PageProps extends React.PropsWithChildren {
	headerChildren?: React.ReactNode;
	footerChildren?: React.ReactNode;
}
const BasePage = ({ headerChildren, footerChildren, children }: PageProps) => {
	const { headerRef, headerHeight, footerRef, footerHeight } = useTheme();

	return (
		<Box>
			<Header ref={headerRef}>{headerChildren}</Header>
			<Box
				className="page-content"
				minHeight="100vh"
				paddingTop={`${headerHeight}px`}
				paddingBottom={`${footerHeight}px`}
			>
				{children}
			</Box>
			<Footer ref={footerRef}>{footerChildren}</Footer>
		</Box>
	);
};

export default BasePage;
