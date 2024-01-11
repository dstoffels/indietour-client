import { Box, Grid, useTheme } from '@mui/material';
import { useDates } from 'context/DateContext';
import { PropsWithChildren } from 'react';
import * as React from 'react';
import { useState, useEffect } from 'react';

interface MainProps extends PropsWithChildren {
	drawerWidth?: number;
	header?: React.ReactNode;
}

const Main = ({ drawerWidth, header, children }: MainProps) => {
	const { drawerOpen } = useDates();

	return null;
};

export default Main;
