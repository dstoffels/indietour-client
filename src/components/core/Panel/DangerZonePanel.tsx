import * as React from 'react';
import { useState, useEffect } from 'react';
import Panel from './Panel';
import { Typography } from '@mui/material';
import DeleteBtn, { DeleteBtnProps } from '../DeleteBtn/DeleteBtn';

export interface DangerZonePanelProps extends DeleteBtnProps {
	deleteBtnText: string;
	fullwidth?: boolean;
}

const DangerZonePanel = (props: DangerZonePanelProps) => {
	const { deleteBtnText, children, fullwidth } = props;
	return (
		<Panel title="Danger Zone" titleColor="error" fullwidth={fullwidth}>
			{children}
			<DeleteBtn {...props}>{deleteBtnText}</DeleteBtn>
		</Panel>
	);
};

export default DangerZonePanel;
