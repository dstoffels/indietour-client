import { Hidden, Theme, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MobileDrawer from './MobileDrawer';
import PersistentDrawer from './PersistentDrawer';
import { TourDate } from 'context/dateContext';

export interface DateDrawerProps {
	fetchDatesQuery?: string;
	defaultDateFields?: TourDate;
}

const DateDrawer = React.forwardRef(
	({ defaultDateFields }: DateDrawerProps, ref: React.Ref<HTMLElement>) => {
		const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

		return (
			<>
				{isMobile && <MobileDrawer ref={ref} />}
				{!isMobile && <PersistentDrawer ref={ref} />}
			</>
		);
	},
);

export default DateDrawer;
