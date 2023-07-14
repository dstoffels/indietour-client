import React, { useEffect, useRef, useState } from 'react';
import Header from '../../Header/Header';
import { Box } from '@mui/material';
import Footer from 'components/Footer/Footer';

const PageLayout = ({ children }: React.PropsWithChildren) => {
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
			<Header ref={appbarRef} />
			<Box className="page-content" marginTop={`${marginTop}px`}>
				{children}
			</Box>
			<Footer />
		</Box>
	);
};

export default PageLayout;
