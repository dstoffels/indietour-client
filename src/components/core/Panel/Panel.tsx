import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface PanelProps extends React.PropsWithChildren {
	title: string;
}

const Panel = ({ title, children }: PanelProps) => {
	return (
		<Grid item xs={12} md={6} lg={4} xl={3}>
			<Paper elevation={2}>
				<Box padding={2}>
					<Typography variant="h6" marginBottom={3}>
						{title}
					</Typography>
					<Stack spacing={2}>{children}</Stack>
				</Box>
			</Paper>
		</Grid>
	);
};

export default Panel;
