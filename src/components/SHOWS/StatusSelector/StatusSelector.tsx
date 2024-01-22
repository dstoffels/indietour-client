import { Add, Remove } from '@mui/icons-material';
import {
	Box,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Theme,
	Tooltip,
	Typography,
} from '@mui/material';
import EditField from 'components/core/EditField/EditField';
import SideStack from 'components/core/SideStack/SideStack';
import { TourDate, useDates } from 'context/DateContext';
import { useTheme } from 'context/ThemeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Show } from '../types';
import api from 'utils/api';
import useShows from 'hooks/useShows';

const StatusSelector = ({ show }: StatusSelectorProps) => {
	const { statusOptions, updateShow } = useShows();
	const { theme } = useTheme();

	const optionItems = statusOptions.map(({ name, description }) => (
		<MenuItem key={`status-${name}`} value={name}>
			<Tooltip title={description} placement="top-end" followCursor>
				<Typography width="100%" color={getStatusColor(name, theme)}>
					{name}
				</Typography>
			</Tooltip>
		</MenuItem>
	));

	const handleChange = (e: SelectChangeEvent) => {
		updateShow(show.id, {
			status: e.target.value as ShowStatus,
		});
	};

	const handleHoldInc = () => {
		updateShow(show.id, { hold: show.hold + 1 });
	};

	const handleHoldDec = () => {
		updateShow(show.id, { hold: show.hold - 1 });
	};

	// const color = getStatusColor(show.status);

	return (
		statusOptions.length && (
			<SideStack justifyContent="start">
				<Stack flexGrow={1}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>
							<Typography color="" variant="overline">
								Status
							</Typography>
						</InputLabel>
						<Select
							fullWidth
							size="small"
							variant="outlined"
							label="Status"
							value={show?.status}
							onChange={handleChange}
						>
							{optionItems}
						</Select>
					</FormControl>
				</Stack>
				{['HOLD', 'CHALLENGED', 'RELEASED'].includes(show?.status) && (
					<Box display="flex" alignItems="center" gap={0.5}>
						<IconButton size="large" color="primary" onClick={handleHoldDec}>
							<Remove />
						</IconButton>
						<Typography>{show.hold}</Typography>
						<IconButton size="large" color="primary" onClick={handleHoldInc}>
							<Add />
						</IconButton>
					</Box>
				)}
			</SideStack>
		)
	);
};

export default StatusSelector;

export function getStatusColor(status: ShowStatus, theme: Theme) {
	switch (status) {
		case 'INQUIRED':
			return theme.palette.secondary.main;
		case 'HOLD':
			return theme.palette.info.main;
		case 'CHALLENGED':
			return theme.palette.warning.main;
		case 'OPTION':
			return theme.palette.success.main;
		case 'DECLINED':
			return theme.palette.action.disabled;
		case 'RELEASED':
			return theme.palette.action.disabled;
		case 'CANCELLED':
			return theme.palette.error.main;
		default:
			return 'inherit';
	}
}

// export function getStatusTooltip(status: TourDateStatusOptions) {

// 	switch (status) {
// 		case 'PROSPECT':
// 			return "A prospective date when routing is still up in the air."
// 		case 'INQUIRED':
// 			return "When you've reached out "
// 		case 'HOLD':
// 			return theme.palette.info.main;
// 		case 'CHALLENGED':
// 			return theme.palette.warning.main;
// 		case 'OPTION':
// 			return theme.palette.success.main;
// 		case 'RELEASED':
// 			return theme.palette.action.disabled;
// 		case 'CONFIRMED':
// 			return theme.palette.error.main;
// 		case 'CANCELLED':
// 			return theme.palette.error.main;
// 		default:
// 			return 'inherit';
// 	}
// }

export type ShowStatus =
	| 'PROSPECT'
	| 'INQUIRED'
	| 'HOLD'
	| 'CHALLENGED'
	| 'RELEASED'
	| 'DECLINED'
	| 'OPTION'
	| 'CONFIRMED'
	| 'CANCELLED';

export type StatusSelectorProps = {
	show: Show;
};
