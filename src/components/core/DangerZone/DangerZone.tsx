import * as React from 'react';
import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, Divider, Stack, Typography } from '@mui/material';
import DeleteBtn, { DeleteBtnProps } from '../DeleteBtn/DeleteBtn';
import { ExpandMore } from '@mui/icons-material';

export interface DangerZoneProps extends DeleteBtnProps {
	deleteBtnText: string;
}

const DangerZone = (props: DangerZoneProps) => {
	const { deleteBtnText, children } = props;
	return (
		<Accordion sx={{ background: 'rgba(255, 0,0, 0.05)' }}>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Typography align="center" variant="overline" color="error">
					DANGER ZONE!
				</Typography>
			</AccordionSummary>
			<Stack spacing={2} padding={2}>
				{children}
				<DeleteBtn variant="text" {...props}>
					{deleteBtnText}
				</DeleteBtn>
			</Stack>
		</Accordion>
	);
};

export default DangerZone;
