import { Check, Close } from '@mui/icons-material';
import {
	Box,
	ClickAwayListener,
	Collapse,
	IconButton,
	TextField,
	TextFieldProps,
	Tooltip,
	Typography,
	debounce,
} from '@mui/material';
import { useGlobals } from 'context/GlobalContext';
import { useTheme } from 'context/ThemeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useKeyPress from 'utils/useKeyPress';

interface ExtendedProps {
	onChange: (value: object) => Promise<any>;
	name: string | number | symbol;
	value?: string | number;
	canEdit?: boolean;
}

export type EditFieldProps = ExtendedProps & TextFieldProps;

export interface EditFieldOpenEvent extends Event {
	detail: { name: string };
}

const EditField = (props: EditFieldProps) => {
	let { label, name, value, onChange, children, sx, canEdit, ...otherProps } = props;
	const { activeEditField, setActiveEditField } = useGlobals();
	const open = activeEditField === name;

	const [text, setText] = useState<string>(value as string);
	const { theme } = useTheme();

	useKeyPress('Escape', handleClose);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		canEdit && setActiveEditField(name);
	};

	function handleClose() {
		setActiveEditField(null);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const update = debounce((inputValue: string, open: boolean) => {
		open && onChange({ [name]: inputValue });
	}, 400);

	useEffect(() => {
		update(text, open);
	}, [text]);

	// children =
	// 	children &&
	// 	React.cloneElement(children as React.ReactElement, { label, name, value, onChange });

	return (
		<Box>
			<Collapse in={open}>
				<Box padding={0.5}>
					<ClickAwayListener onClickAway={handleClose}>
						<Box display="flex" alignItems="end">
							{children || (
								<TextField
									{...otherProps}
									autoFocus={true}
									variant="standard"
									label={label}
									value={text}
									onChange={handleChange}
									sx={{
										...sx,
										'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
											WebkitAppearance: 'none',
											margin: 0,
										},
									}}
								/>
							)}
							<Tooltip title="Close">
								<IconButton color="info" size="large" onClick={handleClose}>
									<Check fontSize="small" />
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
					<Typography color={theme.palette.info.main} variant="overline">
						{label ? label : name}
					</Typography>
					<Typography sx={{ whiteSpace: 'pre-wrap' }}>{value}</Typography>
				</Box>
			</Collapse>
		</Box>
	);
};

export default EditField;
