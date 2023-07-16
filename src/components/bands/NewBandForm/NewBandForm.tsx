import { Check, Close } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import useBand, { Band, useBands } from 'hooks/useBand';
import useForm from 'hooks/useForm';
import { useEffect, useRef } from 'react';

const NewBandForm = ({ onClose, autoFocus }: BandFormProps) => {
	const { createBand } = useBands();

	const onSubmit = async (formData: object) => {
		await createBand(formData);

		// onClose && onClose();
	};

	const { formData, handleChange, handleSubmit } = useForm({ name: '' }, onSubmit);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const disabled = !formData.name;

	useEffect(() => {
		autoFocus && inputRef.current?.focus();
	}, [autoFocus]);

	return (
		<Box component="form" display="flex" onSubmit={handleSubmit}>
			<TextField
				size="small"
				label="Band Name"
				name="name"
				value={formData.name}
				onChange={handleChange}
				inputRef={inputRef}
			/>
			<IconButton disabled={disabled} type="submit" color="info">
				<Check />
			</IconButton>
			<IconButton color="error" onClick={onClose}>
				<Close />
			</IconButton>
		</Box>
	);
};

export default NewBandForm;

interface BandFormProps {
	onClose?: () => void;
	autoFocus: boolean;
}
