import { SwipeableDrawer } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { DateDrawerProps } from './DateDrawer';
import DrawerContent from './DrawerContents';
import { useDates } from 'context/dateContext';

const MobileDrawer = React.forwardRef(
	({ defaultDateFields }: DateDrawerProps, ref: React.Ref<HTMLElement>) => {
		const { activeDate, drawerOpen, setDrawerOpen } = useDates();

		const handleOpen = () => {
			!drawerOpen && setDrawerOpen(true);
		};

		const handleClose = () => {
			drawerOpen && setDrawerOpen(false);
		};

		useEffect(() => {
			activeDate ? handleClose() : handleOpen();
		}, [activeDate]);

		return (
			<SwipeableDrawer
				swipeAreaWidth={50}
				anchor="left"
				open={drawerOpen}
				onOpen={handleOpen}
				onClose={handleClose}
				disableSwipeToOpen={false}
			>
				<DrawerContent defaultDateFields={defaultDateFields} />
			</SwipeableDrawer>
		);
	},
);

export default MobileDrawer;
