import { Check, Close } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { Band, useBands } from 'context/BandContext';
import useForm from 'hooks/useForm';
import { useEffect, useRef } from 'react';

interface BandFormProps {
	onClose?: () => void;
	autoFocus: boolean;
}

const NewBandForm = ({ onClose, autoFocus }: BandFormProps) => {
	const { bands, createBand } = useBands();
	const { formData, handleChange, handleSubmit, reset } = useForm({ name: '' }, createBand);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const disabled = !formData.name;

	const handleClose = () => {
		reset();
		onClose && onClose();
	};

	useEffect(() => {
		autoFocus && inputRef.current?.focus();
	}, [autoFocus]);

	return (
		<Box component="form" display="flex" onSubmit={handleSubmit}>
			<TextField
				size="small"
				label="Create Band"
				placeholder="Band Name"
				name="name"
				value={formData.name}
				onChange={handleChange}
				inputRef={inputRef}
			/>
			<IconButton disabled={disabled} type="submit" color="info">
				<Check />
			</IconButton>
			<IconButton disabled={!bands.length} color="error" onClick={handleClose}>
				<Close />
			</IconButton>
		</Box>
	);
};

export default NewBandForm;
