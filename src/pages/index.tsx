import * as React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import RegisterForm from 'components/auth/RegisterForm/RegisterForm';
import PublicOnlyPage from 'components/page/PublicOnlyPage/PublicOnlyPage';
import Section from 'components/core/Section/Section';

const HomePage = ({}) => {
	return (
		<PublicOnlyPage>
			<Section>
				<Box display="flex" padding={2} justifyContent="center" alignItems="center" height="100%">
					<Stack spacing={2} maxWidth={500}>
						<Typography variant="h3">indietour</Typography>
						<Typography>
							Booking and Tour Management made easy for the independent artist, so you can focus on
							the shit that matters.
						</Typography>
						<RegisterForm />
					</Stack>
				</Box>
			</Section>
		</PublicOnlyPage>
	);
};

export default HomePage;
