import { Typography, Box, Divider, Grid, Button } from '@mui/material';
import RegisterForm from 'components/forms/RegisterForm/RegisterForm';
import * as React from 'react';

import apiRoutes from 'utils/apiRoutes';

const HomePage = ({}) => {
	const fetchBands = async () => {
		try {
			const response = await fetch('/api/bands', { method: 'GET' });
			console.log(await response.json());
		} catch (error) {}
		// try {
		// 	const response = await apiRoutes.get('/bands');
		// 	console.log(response.data);
		// } catch (error) {
		// 	console.error(error);
		// }
	};

	const logout = async () => {
		try {
			const response = await apiRoutes.post('/auth/logout');
			console.log(response.data);
		} catch (error: Error | any) {
			console.error(error.response.data);
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
				<Button onClick={logout}>Log Out</Button>
				<Button onClick={fetchBands}>Get Bands</Button>
			</Box>
		</Grid>
	);
};

export default HomePage;
