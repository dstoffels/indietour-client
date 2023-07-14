import { Typography, Box, Divider, Grid, Button } from '@mui/material';
import PageLayout from 'components/core/PageLayout/PageLayout';
import RegisterForm from 'components/forms/RegisterForm/RegisterForm';
import * as React from 'react';

import api from 'utils/api';

const HomePage = ({}) => {
	const fetchBands = async () => {
		try {
			const response = await fetch('/api/bands', { method: 'GET' });
			console.log(await response.json());
		} catch (error) {}
	};

	return (
		<PageLayout>
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
						Booking and Tour Management made easy for the independent artist, so you can focus on
						the shit that matters.
					</Typography>
					<RegisterForm />
					<Button onClick={fetchBands}>Get Bands</Button>
				</Box>
			</Grid>
		</PageLayout>
	);
};

export default HomePage;
