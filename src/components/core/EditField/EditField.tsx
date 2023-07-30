import { Close } from '@mui/icons-material';
import {
	Box,
	ClickAwayListener,
	Collapse,
	IconButton,
	TextField,
	TextFieldProps,
	Typography,
	debounce,
} from '@mui/material';
import { useTheme } from 'context/themeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useKeyPress from 'utils/useKeyPress';

interface ExtendedProps {
	onChange: (value: object) => Promise<void>;
	name: string | number | symbol;
	value?: string | number;
}

export type EditFieldProps = ExtendedProps & TextFieldProps;

const EditField = (props: EditFieldProps) => {
	let { label, name, value, onChange, children, sx } = props;
	const [open, setOpen] = useState(false);
	const [text, setText] = useState<string>(value as string);
	const { theme } = useTheme();

	useKeyPress('Escape', handleClose);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setOpen(true);
	};

	function handleClose() {
		setOpen(false);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const update = React.useMemo(
		() =>
			debounce((inputValue: string, open: boolean) => {
				open && onChange({ [name]: inputValue });
			}, 250),
		[],
	);

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
									{...props}
									autoFocus
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
							<IconButton color="error" onClick={handleClose}>
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
					<Typography color={theme.palette.info.main} variant="caption">
						{label}
					</Typography>
					<Typography sx={{ whiteSpace: 'pre-wrap' }}>{value}</Typography>
				</Box>
			</Collapse>
		</Box>
	);
};

export default EditField;
