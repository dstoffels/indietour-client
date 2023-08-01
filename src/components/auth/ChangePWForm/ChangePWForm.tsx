import { Box, Button, Stack, TextField } from '@mui/material';
import { useAuth } from 'context/authContext';
import useForm from 'hooks/useForm';
import * as React from 'react';
import { useState, useEffect } from 'react';

const labels = ['Old Password', 'New Password', 'New Password Again'];

const ChangePWForm = () => {
	const { changePassword } = useAuth();
	const { formData, handleChange, handleSubmit, reset } = useForm(
		{ oldPassword: '', newPassword: '', newPassword2: '' },
		changePassword,
	);

	const textfields = Object.entries(formData).map(([name, value], i) => (
		<TextField
			value={value}
			name={name}
			onChange={handleChange}
			label={labels[i]}
			key={`pw-field-${name}`}
			type="password"
		/>
	));

	const disabled = !formData.newPassword || formData.newPassword !== formData.newPassword2;

	return (
		<Box component="form" onSubmit={handleSubmit}>
			<Stack spacing={2}>
				{textfields}
				<Button disabled={disabled} type="submit">
					Change Password
				</Button>
			</Stack>
		</Box>
	);
};

export default ChangePWForm;
