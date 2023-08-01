import { Hidden, Theme, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MobileDrawer from './MobileDrawer';
import PersistentDrawer from './PersistentDrawer';
import { TourDate } from 'context/dateContext';
import { NewDatePropsWithChildren } from '../NewDateForm/NewDateForm';

const DateDrawer = React.forwardRef(
	(props: NewDatePropsWithChildren, ref: React.Ref<HTMLElement>) => {
		const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

		return (
			<>
				{isMobile && <MobileDrawer {...props} ref={ref} />}
				{!isMobile && <PersistentDrawer {...props} ref={ref} />}
			</>
		);
	},
);

export default DateDrawer;
