import { LocationOn } from '@mui/icons-material';
import * as React from 'react';
import { useState, useEffect } from 'react';

export type MapIconProps = {
	label: string;
};

const MapIcon = ({ label }: MapIconProps) => {
	return <LocationOn color="error" fontSize="large" />;
};

export default MapIcon;
