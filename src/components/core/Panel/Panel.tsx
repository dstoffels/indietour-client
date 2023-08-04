import { Box, BoxProps, Collapse, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { TypographyProps } from '@mui/material';
import { useGlobals } from 'context/GlobalContext';

export interface PanelProps extends React.PropsWithChildren {
	title: string;
	titleColor?: TypographyProps['color'] | BoxProps['color'];
	footer?: any;
}

const Panel = ({ title, titleColor = 'inherit', children, footer }: PanelProps) => {
	const { mainWidth } = useGlobals();
	const [loaded, setLoaded] = useState(false);

	let cols = 0;

	if (mainWidth < 650) cols = 12;
	else if (mainWidth < 960) cols = 6;
	else cols = 6;

	useEffect(() => {
		loaded && setLoaded(false);
		setTimeout(() => {
			setLoaded(true);
		}, 1);
	}, [children]);

	return (
		<Grid item xs={cols}>
			<Collapse in={loaded}>
				<Paper elevation={2}>
					<Box paddingX={2} paddingY={1}>
						<Typography align="center" variant="h6" fontWeight={600} color={titleColor}>
							{title}
						</Typography>
					</Box>
					<Divider />
					<Stack padding={2} spacing={2}>
						{children}
					</Stack>
					{footer && <Divider />}
					<Box>{footer}</Box>
				</Paper>
			</Collapse>
		</Grid>
	);
};

export default Panel;
