import { AxiosError } from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Box, CircularProgress, Popover, Typography } from '@mui/material';
import { useTheme } from 'context/themeContext';

const useForm = <T extends object>(initialData: T, onSubmit: (formData: T) => Promise<any>) => {
	const [formData, setformData] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const { theme } = useTheme();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		await onSubmit(formData);
		setLoading(false);
		setformData(initialData);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const reset = () => {
		setformData(initialData);
	};

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
		loading,
		LoadingAnimation,
		reset,
	};
};

export default useForm;
