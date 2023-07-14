import { AxiosError } from 'axios';
import * as React from 'react';
import { useState } from 'react';

const useForm = <T extends object>(initialData: T, onSubmit: (formData: T) => void) => {
	const [formData, setformData] = useState(initialData);
	const [errors, setErrors] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			await onSubmit(formData);
		} catch (e: AxiosError | any) {
			setErrors(e.response.data.detail);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const clearErrors = () => setErrors('');

	return { formData, handleChange, handleSubmit, errors, clearErrors };
};

export default useForm;

interface FormError extends Error {
	response: {
		data: {};
	};
}
