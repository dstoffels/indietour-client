import * as React from 'react';
import { useState, useEffect } from 'react';
import ButtonForm, { ButtonFormProps } from './ButtonForm';
import { Box, Collapse } from '@mui/material';

interface ExtendedProps {
	fieldComponents: React.ReactNode;
	fixed?: boolean;
}

export type ButtonFormExclusiveProps = ButtonFormProps & ExtendedProps;

const ButtonFormExclusive = (props: ButtonFormExclusiveProps) => {
	const { fieldComponents, fixed, children, ...otherProps } = props;
	const [open, setOpen] = useState(false);

	return (
		<Box>
			<Box>
				<ButtonForm {...otherProps} onOpen={setOpen} onClose={setOpen}>
					{fieldComponents}
				</ButtonForm>
			</Box>
			<Collapse in={!open}>{children}</Collapse>
		</Box>
	);
};

export default ButtonFormExclusive;
