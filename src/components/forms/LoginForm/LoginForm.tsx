import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import axios from 'axios';
import useForm from 'hooks/useForm';
import * as React from 'react';
import { useState } from 'react';
import apiRoutes from 'utils/apiRoutes';

const LoginForm = ({ inline = false }) => {
	const initialData = { email: '', password: '' };

	const onSubmit = async (formData: LoginCredentials) => {
		try {
			const response = await axios.post('/api/auth/login', formData);
			console.log(response.data);
		} catch (error: Error | any) {
			console.error(error.response.data);
		}
	};

	const { formData, handleChange, handleSubmit } = useForm<LoginCredentials>(initialData, onSubmit);

	return (
		<Box component="form" display="inline-block" onSubmit={handleSubmit}>
			<Stack spacing={1} padding={1} direction={inline ? 'row' : 'column'}>
				<TextField
					size="small"
					label="Email"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				<TextField
					size="small"
					label="Password"
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<Button variant="contained" type="submit" color="secondary">
					LOGIN
				</Button>
			</Stack>
		</Box>
	);
};

export default LoginForm;

interface LoginCredentials {
	email: string;
	password: string;
}
