import { Box } from '@mui/material';
import BasePage from 'components/page/BasePage/BasePage';
import { NextPage } from 'next';
import * as React from 'react';

const NotFoundPage = () => {
	return (
		<BasePage>
			<Box display="flex" justifyContent="center" alignItems="center">
				<h1>404 - Ope! Nothin' here...</h1>
			</Box>
		</BasePage>
	);
};

export default NotFoundPage;
