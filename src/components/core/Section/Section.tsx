import { Box, BoxProps } from '@mui/material';
import { useTheme } from 'context/themeContext';
import * as React from 'react';

interface SectionProps extends BoxProps {}

const Section = (props: SectionProps) => {
	const { footerHeight, headerHeight } = useTheme();
	return (
		<Box
			height={`calc(100vh - (${headerHeight}px + ${footerHeight}px))`}
			{...props}
			component="section"
		>
			{props.children}
		</Box>
	);
};

export default Section;
