import { Box, Button, Stack, TextField } from '@mui/material';

import { useAuth, LoginCredentials } from 'context/authContext';
import useForm from 'hooks/useForm';
import * as React from 'react';

const LoginForm = ({ inline = false }) => {
	const { user, login } = useAuth();
	const initialData = { email: '', password: '' };

	const { formData, handleChange, handleSubmit } = useForm<LoginCredentials>(initialData, login);

	const disabled = !formData.email || !formData.password;

	return user ? null : (
		<Box component="form" display="inline-block" onSubmit={handleSubmit}>
			<Stack spacing={1} padding={1} direction={inline ? 'row' : 'column'}>
				<TextField
					required
					size="small"
					label="Email"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				<TextField
					required
					size="small"
					label="Password"
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<Button disabled={disabled} variant="contained" type="submit" color="secondary">
					LOGIN
				</Button>
			</Stack>
		</Box>
	);
};

export default LoginForm;