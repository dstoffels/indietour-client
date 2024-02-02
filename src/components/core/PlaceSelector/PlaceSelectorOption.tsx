import { LocationOn } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';
import * as React from 'react';

import { useState, useEffect } from 'react';
import SideStack from '../SideStack/SideStack';

export interface PlaceSelectorOptionProps {
	props: object;
	option: PlaceMin;
}
const PlaceSelectorOption = ({ props, option }: PlaceSelectorOptionProps) => {
	const matches = option.structured_formatting.main_text_matched_substrings || [];

	matches.map((match: any) => [match.offset, match.offset + match.length]);

	return (
		<li {...props}>
			<SideStack width="100%">
				<Stack>
					<Typography fontWeight="500">{option.structured_formatting.main_text}</Typography>
					<Typography variant="caption">{option.structured_formatting.secondary_text}</Typography>
				</Stack>
				<LocationOn />
			</SideStack>
		</li>
	);
};

export default PlaceSelectorOption;

interface MainTextMatchedSubstrings {
	offset: number;
	length: number;
}

export type PlaceMin = {
	place_id: string;
	description: string;
	structured_formatting: {
		main_text: string;
		secondary_text: string;
		main_text_matched_substrings?: [{ offset: number; length: number }];
	};
	geometry: {
		location: {
			lat: number;
			lng: number;
		};
	};
};
