import { Stack, StackProps } from '@mui/material';
import React from 'react';

interface SideStackProps {
	spacing?: number;
	padding?: number;
	paddingX?: number;
	paddingY?: number;
	justifyContent?: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => {};
}

const SideStack = (props: StackProps) => {
	const {
		spacing = 2,
		direction = 'row',
		children,
		alignItems = 'center',
		justifyContent = 'space-between',
		width = '100%',
		...otherProps
	} = props;

	return (
		<Stack
			spacing={spacing}
			direction={direction}
			alignItems={alignItems}
			justifyContent={justifyContent}
			width={width}
			{...otherProps}
		>
			{children}
		</Stack>
	);
};

export default SideStack;
