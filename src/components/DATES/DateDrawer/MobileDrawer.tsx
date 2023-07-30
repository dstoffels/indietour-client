import { SwipeableDrawer } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { DateDrawerProps } from './DateDrawer';
import DrawerContent from './DrawerContents';
import { useDates } from 'context/dateContext';

const MobileDrawer = React.forwardRef(
	({ fetchDatesQuery, defaultDateFields }: DateDrawerProps, ref: React.Ref<HTMLElement>) => {
		const { drawerOpen, setDrawerOpen } = useDates();

		const handleOpen = () => {
			setDrawerOpen(true);
		};

		const handleClose = () => {
			setDrawerOpen(false);
		};

		return (
			<SwipeableDrawer onOpen={handleOpen} open={drawerOpen} onClose={handleClose}>
				<DrawerContent fetchDatesQuery={fetchDatesQuery} defaultDateFields={defaultDateFields} />
			</SwipeableDrawer>
		);
	},
);

export default MobileDrawer;
