import { AxiosError } from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Box, Popover, Typography } from '@mui/material';
import { useTheme } from 'context/globalContext';

const useForm = <T extends object>(initialData: T, onSubmit: (formData: T) => Promise<boolean>) => {
	const [formData, setformData] = useState(initialData);
	const [errors, setErrors] = useState<string | React.ReactElement[]>('');
	const { theme } = useTheme();

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			return await onSubmit(formData);
		} catch (e: AxiosError | any) {
			console.error(e.response.data);
			const { data } = e.response;
			if (data.detail) setErrors(data.detail);
			else {
				const errors = Object.entries<[1]>(data).map(([key, msgs]) => (
					<Box key={`register-error-${key}`}>{`${key}: ${msgs[0]}`}</Box>
				));
				setErrors(errors);
			}

			return false;
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const clearErrors = () => setErrors('');
	const popoverRef = React.useRef(null);
	const open = Boolean(errors);

	const ErrorPopover = () => (
		<Popover
			open={open}
			onClose={clearErrors}
			anchorEl={popoverRef.current}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Box padding={2} color={theme.palette.error.main}>
				{errors}
			</Box>
		</Popover>
	);

	return { formData, handleChange, handleSubmit, ErrorPopover, popoverRef };
};

export default useForm;
