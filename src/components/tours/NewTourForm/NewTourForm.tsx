import { Check, Close } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { useTours } from 'context/ourContext';
import useForm from 'hooks/useForm';
import { useEffect, useRef } from 'react';

const NewTourForm = ({ onClose, autoFocus }: TourFormProps) => {
	const { tours, createTour } = useTours();
	const { formData, handleChange, handleSubmit } = useForm({ name: '' }, createTour);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const disabled = !formData.name;

	useEffect(() => {
		autoFocus && inputRef.current?.focus();
	}, [autoFocus]);

	return (
		<Box component="form" display="flex" onSubmit={handleSubmit}>
			<TextField
				size="small"
				label="Create Tour"
				placeholder="Tour Name"
				name="name"
				value={formData.name}
				onChange={handleChange}
				inputRef={inputRef}
			/>
			<IconButton disabled={disabled} type="submit" color="info">
				<Check />
			</IconButton>
			<IconButton disabled={!tours?.length} color="error" onClick={onClose}>
				<Close />
			</IconButton>
		</Box>
	);
};

export default NewTourForm;

interface TourFormProps {
	onClose?: () => void;
	autoFocus: boolean;
}
