import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';

import { useState, useEffect } from 'react';

export interface PlaceSelectorOptionProps {
	props: object;
	option: PlaceType;
}
const PlaceSelectorOption = ({ props, option }: PlaceSelectorOptionProps) => {
	const matches = option.structured_formatting.main_text_matched_substrings || [];

	matches.map((match: any) => [match.offset, match.offset + match.length]);

	return (
		<li {...props}>
			<Grid container alignItems="center">
				<Grid item sx={{ wordWrap: 'break-word' }}>
					<Typography fontWeight="500">{option.structured_formatting.main_text}</Typography>
					<Typography variant="caption">{option.structured_formatting.secondary_text}</Typography>
				</Grid>
			</Grid>
		</li>
	);
};

export default PlaceSelectorOption;

interface MainTextMatchedSubstrings {
	offset: number;
	length: number;
}
interface StructuredFormatting {
	main_text: string;
	secondary_text: string;
	main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
	place_id: string;
	description: string;
	structured_formatting: StructuredFormatting;
}
