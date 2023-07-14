import { AxiosError } from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Box, CircularProgress, Popover, Typography } from '@mui/material';
import { useTheme } from 'context/globalContext';

const useForm = <T extends object>(initialData: T, onSubmit: (formData: T) => Promise<boolean>) => {
	const [formData, setformData] = useState(initialData);
	const [errors, setErrors] = useState<string | React.ReactElement[]>('');
	const [loading, setLoading] = useState(false);
	const { theme } = useTheme();

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			setLoading(true);
			const success = await onSubmit(formData);
			setLoading(false);
			return success;
		} catch (e: AxiosError | any) {
			// setLoading(false)
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

	const LoadingAnimation = () =>
		loading && (
			<CircularProgress
				size={24}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					marginTop: '-12px',
					marginBottom: '-12px',
				}}
			/>
		);

	return {
		formData,
		handleChange,
		handleSubmit,
		ErrorPopover,
		popoverRef,
		loading,
		LoadingAnimation,
	};
};

export default useForm;
