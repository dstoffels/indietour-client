import { Box, Button, Grid, Popover, Popper, Stack, TextField, Typography } from '@mui/material';

import { useAuth, LoginCredentials } from 'context/authContext';
import useForm from 'hooks/useForm';
import * as React from 'react';

const LoginForm = ({ inline = false }) => {
	const { user, login } = useAuth();
	const initialData = { email: '', password: '' };

	const { formData, handleChange, handleSubmit, errors, clearErrors } = useForm<LoginCredentials>(
		initialData,
		login,
	);

	const ref = React.useRef(null);

	const open = Boolean(errors);

	return user ? null : (
		<Box ref={ref} component="form" display="inline-block" onSubmit={handleSubmit}>
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
				<Button variant="contained" type="submit" color="secondary">
					LOGIN
				</Button>
				<Popover
					open={open}
					onClose={clearErrors}
					anchorEl={ref.current}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Typography padding={1} color="error">
						{errors}
					</Typography>
				</Popover>
			</Stack>
		</Box>
	);
};

export default LoginForm;
