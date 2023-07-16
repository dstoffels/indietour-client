import React, { useEffect, useRef, useState } from 'react';
import Header from '../../core/Header/Header';
import { Box } from '@mui/material';
import Footer from 'components/core/Footer/Footer';

const BasePage = ({ headerChildren, children }: PageProps) => {
	const [marginTop, setMarginTop] = useState(0);
	const appbarRef = useRef<HTMLDivElement | null>(null);

	const handleWindowResize = () => {
		if (appbarRef.current) {
			setMarginTop(appbarRef.current.clientHeight);
		}
	};

	useEffect(() => {
		handleWindowResize();
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	return (
		<Box className="main">
			<Header ref={appbarRef}>{headerChildren}</Header>
			<Box className="page-content" marginTop={`${marginTop}px`}>
				{children}
			</Box>
			<Footer />
		</Box>
	);
};

export default BasePage;

export interface PageProps extends React.PropsWithChildren {
	headerChildren?: React.ReactNode;
}
