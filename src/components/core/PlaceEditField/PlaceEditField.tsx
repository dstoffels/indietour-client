import * as React from 'react';
import { useState, useEffect } from 'react';
import EditField from '../EditField/EditField';
import PlaceSelector from '../PlaceSelector/PlaceSelector';
import { Place, useDates } from 'context/dateContext';
import { PlaceType } from '../PlaceSelector/PlaceSelectorOption';
import api from 'utils/api';
import { Box, ClickAwayListener, Collapse, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTheme } from 'context/themeContext';
import SideStack from '../SideStack/SideStack';
import useKeyPress from 'utils/useKeyPress';

export interface PlaceEditFieldProps {
	label?: string;
}

const PlaceEditField = ({ label }: PlaceEditFieldProps) => {
	useKeyPress('Escape', handleClose);

	const { theme } = useTheme();
	const { activeDate, updateTourdate } = useDates();
	const [place, setPlace] = useState<PlaceType | null>(null);
	const [open, setOpen] = useState(false);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setOpen(true);
	};

	function handleClose() {
		setOpen(false);
	}

	useEffect(() => {}, [activeDate]);

	useEffect(() => {
		updateTourdate({ place_id: place?.place_id });
	}, [place]);

	const initialInputValue = `${activeDate?.place?.name}, ${activeDate?.place?.political_address}`;

	return (
		<Box>
			<Collapse in={open}>
				<Box padding={0.5}>
					<ClickAwayListener onClickAway={handleClose}>
						<Box display="flex" alignItems="end">
							<PlaceSelector
								value={place}
								onChange={(place) => setPlace(place)}
								initialInputValue={initialInputValue}
							/>
							<IconButton onClick={handleClose} color="error">
								<Close fontSize="small" />
							</IconButton>
						</Box>
					</ClickAwayListener>
				</Box>
			</Collapse>
			<Collapse in={!open}>
				<Box
					onClick={handleOpen}
					padding={0.5}
					sx={{
						transition: 'all 0.3s',
						':hover': {
							cursor: 'pointer',
							background: 'rgba(255,255,255,0.05)',
						},
					}}
				>
					<Typography variant="caption" color={theme.palette.info.main}>
						Location
					</Typography>
					<Typography>{initialInputValue}</Typography>
				</Box>
			</Collapse>
		</Box>
	);
};

export default PlaceEditField;
