import { Check, Close } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import useBand, { Band, useBands } from 'hooks/useBand';
import useForm from 'hooks/useForm';
import { useEffect, useRef } from 'react';

const NewBandForm = ({ bands, createBand, onClose, autoFocus }: BandFormProps) => {
	const { formData, handleChange, handleSubmit } = useForm({ name: '' }, createBand);

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
				placeholder={!bands.length ? 'Create New Band' : ''}
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
	createBand: (bandData: object) => Promise<void>;
	bands: Array<Band>;
}
