import { Box, BoxProps, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { TypographyProps } from '@mui/material';

export interface PanelProps extends React.PropsWithChildren {
	title?: string;
	titleColor?: TypographyProps['color'] | BoxProps['color'];
	fullwidth?: boolean;
}

const Panel = ({ title, titleColor = 'primary', fullwidth, children }: PanelProps) => {
	return (
		<Grid item xs={12} md={!fullwidth && 6} lg={!fullwidth && 4} xl={!fullwidth && 3}>
			<Paper elevation={2}>
				<Box paddingX={2} paddingY={1}>
					<Typography align="center" variant="h5" color={titleColor}>
						{title}
					</Typography>
				</Box>
				<Divider />
				<Stack padding={2} spacing={2}>
					{children}
				</Stack>
			</Paper>
		</Grid>
	);
};

export default Panel;
