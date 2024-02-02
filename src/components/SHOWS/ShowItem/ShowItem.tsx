import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Show } from '../types';
import StatusSelector, { getStatusColor } from '../StatusSelector/StatusSelector';
import EditField from 'components/core/EditField/EditField';
import { useDates } from 'context/DateContext';
import useShows from 'hooks/useShows';
import SideStack from 'components/core/SideStack/SideStack';

const ShowItem = ({ show, index, activeIndex, onClick }: ShowItemProps) => {
	const { isTourAdmin } = useDates();
	const { updateShow } = useShows();
	const theme = useTheme();

	const expanded = index === activeIndex;

	const handleClick = (e: React.SyntheticEvent, isExpanded: boolean) => {
		onClick(isExpanded ? index : -1);
	};

	return (
		<Accordion expanded={expanded} onChange={handleClick}>
			<AccordionSummary>
				<Stack>
					<SideStack>
						<Typography color={getStatusColor(show.status, theme)}>
							{show.venue.place?.name}
						</Typography>
						<Typography color={getStatusColor(show.status, theme)}>{show.status}</Typography>
					</SideStack>
					<Typography color={getStatusColor(show.status, theme)} variant="caption">
						{show.venue.place?.political_address}
					</Typography>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<StatusSelector show={show} />
				<EditField
					label="Deal"
					name="deal"
					value={show.deal}
					onChange={(value) => updateShow(show.id, value as Show)}
					canEdit={isTourAdmin}
					fullWidth
				/>
				<EditField
					label="Notes"
					name="notes"
					value={show.notes}
					onChange={(value) => updateShow(show.id, value as Show)}
					canEdit={isTourAdmin}
					fullWidth
					multiline
				/>
			</AccordionDetails>
		</Accordion>
	);
};

export default ShowItem;

export type ShowItemProps = {
	show: Show;
	index: number;
	activeIndex: number;
	onClick: Function;
};
