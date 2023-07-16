import { Typography, Box, Divider, Grid, Button } from '@mui/material';
import RegisterForm from 'components/auth/RegisterForm/RegisterForm';
import * as React from 'react';
import PublicOnlyPage from 'components/page/PublicOnlyPage/PublicOnlyPage';

const HomePage = ({}) => {
	return (
		<PublicOnlyPage>
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
		</PublicOnlyPage>
	);
};

export default HomePage;
