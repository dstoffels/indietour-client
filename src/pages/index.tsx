import { Typography, Box, Divider, Grid, Button } from '@mui/material';
import BasePage from 'components/page/BasePage/BasePage';
import RegisterForm from 'components/forms/RegisterForm/RegisterForm';
import * as React from 'react';
import PublicPage from 'components/page/PublicPage/PublicPage';

const HomePage = ({}) => {
	return (
		<PublicPage>
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
				</Box>
			</Grid>
		</PublicPage>
	);
};

export default HomePage;
