import { TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';

const NumberField = (props: TextFieldProps) => {
	const isNumber = (value: string) => !isNaN(Number(value));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = isNumber(e.target.value) ? e.target.value : '';
		props.onChange && props.onChange(e);
	};

	return <TextField {...props} onChange={handleChange} />;
};

export default NumberField;
