import React, { useEffect, useRef, useState } from 'react';
import Appbar from '../../Appbar/Appbar';
import { Box } from '@mui/material';

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
			<Appbar ref={appbarRef} />
			<Box className="page-content" marginTop={`${marginTop}px`}>
				{children}
			</Box>
		</Box>
	);
};

export default PageLayout;
