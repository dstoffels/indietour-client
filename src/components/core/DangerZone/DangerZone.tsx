import * as React from 'react';
import { useState, useEffect } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import DeleteBtn, { DeleteBtnProps } from '../DeleteBtn/DeleteBtn';

export interface DangerZoneProps extends DeleteBtnProps {
	deleteBtnText: string;
}

const DangerZone = (props: DangerZoneProps) => {
	const { deleteBtnText, children } = props;
	return (
		<Stack spacing={2} padding={2} sx={{ background: 'rgba(255, 0,0, 0.05)' }}>
			<Typography align="center" variant="h6" color="error">
				DANGER ZONE!
			</Typography>
			{children}
			<DeleteBtn variant="text" {...props}>
				{deleteBtnText}
			</DeleteBtn>
		</Stack>
	);
};

export default DangerZone;
