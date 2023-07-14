import { TextField } from '@mui/material';
import ButtonForm from 'components/forms/ButtonForm/ButtonForm';
import { RegiserFormData, useAuth } from 'context/authContext';
import useForm from 'hooks/useForm';
import * as React from 'react';

const RegisterForm = ({}) => {
	const initialData = { email: '', username: '', password: '', password2: '' };

	const { register } = useAuth();

	const { formData, handleChange, handleSubmit, ErrorPopover, popoverRef } =
		useForm<RegiserFormData>(initialData, register);

	const disabled = !formData.password || formData.password !== formData.password2;

	return (
		<ButtonForm
			title="Create Account"
			btnText="Sign Up"
			btnVariant="contained"
			spacing={1}
			btnColor="secondary"
			onSubmit={handleSubmit}
			disabled={disabled}
			submitBtnTxt="Sign Up"
			ref={popoverRef}
		>
			<TextField
				label="Email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				type="email"
			/>
			<TextField
				label="Username"
				name="username"
				value={formData.username}
				onChange={handleChange}
				type="text"
			/>
			<TextField
				label="Password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				type="password"
			/>
			<TextField
				label="Confirm Password"
				name="password2"
				value={formData.password2}
				onChange={handleChange}
				type="password"
			/>
			<ErrorPopover />
		</ButtonForm>
	);
};

export default RegisterForm;

interface FormData {
	email: string;
	username: string;
	password: string;
	password2: string;
}
