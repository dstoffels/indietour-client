import * as React from 'react';
import { useState, useEffect } from 'react';
import EditField from '../EditField/EditField';
import PlaceSelector from '../PlaceSelector/PlaceSelector';
import { Place, useDates } from 'context/DateContext';
import { PlaceType } from '../PlaceSelector/PlaceSelectorOption';
import api from 'utils/api';
import { Box, ClickAwayListener, Collapse, IconButton, Tooltip, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTheme } from 'context/ThemeContext';
import SideStack from '../SideStack/SideStack';
import useKeyPress from 'utils/useKeyPress';

export interface PlaceEditFieldProps {
	label?: string;
	name?: string;
	onChange: (obj: object) => any;
	initialInputValue: string;
	canEdit: boolean;
}

const PlaceEditField = ({
	label,
	name = 'place_id',
	onChange,
	initialInputValue,
	canEdit,
}: PlaceEditFieldProps) => {
	useKeyPress('Escape', handleClose);

	const { theme } = useTheme();
	const [place, setPlace] = useState<PlaceType | null>(null);
	const [open, setOpen] = useState(false);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		canEdit && setOpen(true);
	};

	function handleClose() {
		setOpen(false);
	}

	useEffect(() => {
		place && onChange({ [name]: place?.place_id });
	}, [place]);

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
							<Tooltip title="Close">
								<IconButton onClick={handleClose} color="error">
									<Close fontSize="small" />
								</IconButton>
							</Tooltip>
						</Box>
					</ClickAwayListener>
				</Box>
			</Collapse>
			<Collapse in={!open}>
				<Box
					onClick={handleOpen}
					padding={0.5}
					sx={
						canEdit
							? {
									transition: 'all 0.3s',
									':hover': {
										cursor: 'pointer',
										background: 'rgba(255,255,255,0.05)',
									},
							  }
							: {}
					}
				>
					<Typography variant="overline" color={theme.palette.info.main}>
						{label || 'Location'}
					</Typography>
					<Typography>{initialInputValue}</Typography>
				</Box>
			</Collapse>
		</Box>
	);
};

export default PlaceEditField;
