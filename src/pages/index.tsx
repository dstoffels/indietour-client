import { Typography, Box, Divider, Grid, Button } from '@mui/material';
import axios from 'axios';
import RegisterForm from 'components/forms/RegisterForm/RegisterForm';
import * as React from 'react';

import { useState } from 'react';
import apiRoutes from 'utils/apiRoutes';

const HomePage = ({}) => {
	const fetchBands = async () => {
		try {
			const response = await apiRoutes.get('/bands/d78ad203-97d0-4f81-bfa8-e138252578c7');
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Grid
			component="section"
			container
			padding={2}
			justifyContent="center"
			alignItems="center"
			textAlign="center"
		>
			<Box maxWidth={500}>
				<Typography variant="h3">indietour</Typography>
				<Typography>
					Booking and Tour Management made easy for the independent artist, so you can focus on the
					shit that matters.
				</Typography>
				<RegisterForm />
				<Button onClick={fetchBands}>Get Bands</Button>
			</Box>
		</Grid>
	);
};

export default HomePage;
