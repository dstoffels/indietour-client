import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Box, Grid, Stack } from '@mui/material';
import RegisterForm from 'components/auth/RegisterForm/RegisterForm';
import PublicOnlyPage from 'components/page/PublicOnlyPage/PublicOnlyPage';
import Section from 'components/core/Section/Section';

const HomePage = ({}) => {
	return (
		<PublicOnlyPage>
			<Section>
				<Box display="flex" padding={2} justifyContent="center" alignItems="center" height="100%">
					<Box maxWidth={500}>
						<Typography variant="h3">indietour</Typography>
						<Typography>
							Booking and Tour Management made easy for the independent artist, so you can focus on
							the shit that matters.
						</Typography>
						<RegisterForm />
					</Box>
				</Box>
			</Section>
		</PublicOnlyPage>
	);
};

export default HomePage;
