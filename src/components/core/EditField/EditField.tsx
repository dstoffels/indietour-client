import { Close } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography, debounce } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useKeyPress from 'utils/useKeyPress';

export interface EditFieldProps extends React.PropsWithChildren {
	label?: string;
	name: string;
	value?: string | number | null;
	onChange: (value: object) => Promise<void>;
}

const EditField = ({ label, name, value, onChange, children }: EditFieldProps) => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState<string>(value as string);
	useKeyPress('Escape', handleClose);

	const handleClick = () => {
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
			debounce((inputValue: string) => {
				onChange({ [name]: inputValue });
			}, 250),
		[],
	);

	useEffect(() => {
		update(text);
	}, [text]);

	children =
		children &&
		React.cloneElement(children as React.ReactElement, { label, name, value, onChange });

	return (
		<Box>
			{open ? (
				<Box display="flex" alignItems="center" sx={{ transition: 'all 0.25s' }}>
					{children || (
						<TextField
							fullWidth
							autoFocus
							variant="standard"
							label={label}
							value={text}
							onChange={handleChange}
						/>
					)}
					<IconButton size="small" color="error" onClick={handleClose}>
						<Close fontSize="small" />
					</IconButton>
				</Box>
			) : (
				<Box
					onClick={handleClick}
					padding={0.5}
					sx={{
						transition: 'all 0.25s',
						':hover': {
							cursor: 'pointer',
							background: 'rgba(255,255,255,0.05)',
						},
					}}
				>
					<Typography variant="caption">{label}</Typography>
					<Typography>{value}</Typography>
				</Box>
			)}
		</Box>
	);
};

export default EditField;
