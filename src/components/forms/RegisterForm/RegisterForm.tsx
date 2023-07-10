import { TextField } from '@mui/material';
import ButtonForm from 'components/core/ButtonForm/ButtonForm';
import useForm from 'hooks/useForm';
import * as React from 'react';

const RegisterForm = ({}) => {
	const onSubmit = (formData: object) => {
		console.log(formData);
	};

	const { formData, handleChange, handleSubmit } = useForm<FormData>(
		{ email: '', username: '', password: '', password2: '' },
		onSubmit,
	);

	const fields = Object.entries(formData).map(([name, value]) => (
		<TextField
			name={name}
			value={value}
			label={name}
			type={name}
			onChange={handleChange}
			key={`register-field-${name}`}
		/>
	));

	return (
		<ButtonForm btnText="Sign Up" spacing={1} onSubmit={handleSubmit}>
			{fields}
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
