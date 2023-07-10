import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

const LoginForm = ({ inline = false }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<Box component="form" display="inline-block" onSubmit={handleSubmit}>
			<Stack spacing={1} padding={1} direction={inline ? 'row' : 'column'}>
				<TextField size="small" label="Email" type="email" />
				<TextField size="small" label="Password" type="password" />
				<Button variant="contained" type="submit" color="secondary">
					LOGIN
				</Button>
			</Stack>
		</Box>
	);
};

export default LoginForm;
