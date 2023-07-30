import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface PanelProps extends React.PropsWithChildren {
	title: string;
}

const Panel = ({ title, children }: PanelProps) => {
	return (
		<Grid item xs={12} lg={6} xl={4}>
			<Paper elevation={2}>
				<Stack padding={1} spacing={1}>
					<Typography variant="h6" marginBottom={1}>
						{title}
					</Typography>
					<Box>{children}</Box>
				</Stack>
			</Paper>
		</Grid>
	);
};

export default Panel;
