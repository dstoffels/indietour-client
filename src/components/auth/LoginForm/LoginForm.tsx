import { Box, Button, Hidden, Stack, TextField } from '@mui/material';

import { useAuth, LoginCredentials } from 'context/uthContext';
import useForm from 'hooks/useForm';
import * as React from 'react';

const LoginForm = ({ inline = false }) => {
	const { user, login } = useAuth();
	const initialData = { email: '', password: '' };

	const { formData, handleChange, handleSubmit } = useForm<LoginCredentials>(initialData, login);

	const disabled = !formData.email || !formData.password;

	return user ? null : (
		<Box component="form" width="100%" maxWidth={700} onSubmit={handleSubmit}>
			<Stack spacing={1} direction={inline ? 'row' : 'column'}>
				<TextField
					required
					size="small"
					label="Email"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					required
					size="small"
					label="Password"
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					fullWidth
				/>
				<Button disabled={disabled} variant="contained" type="submit" color="secondary">
					LOGIN
				</Button>
			</Stack>
		</Box>
	);
};

export default LoginForm;
