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

const SideStack = ({
	spacing = 2,
	padding = 0,
	paddingX,
	paddingY,
	justifyContent = 'space-between',
	children,
	className = '',
	onClick,
}: StackProps) => {
	return (
		<Stack
			onClick={onClick}
			className={className}
			width="100%"
			spacing={spacing}
			padding={paddingX || paddingY ? 0 : padding}
			paddingX={paddingX}
			paddingY={paddingY}
			direction="row"
			justifyContent={justifyContent}
			alignItems="center"
		>
			{children}
		</Stack>
	);
};

export default SideStack;
