import { useTheme } from 'context/hemeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MobileDrawer from './MobileDrawer';
import PersistentDrawer from './PersistentDrawer';
import DrawerContents from './DrawerContents';
import { useDates } from 'context/DateContext';

const ScheduleDrawer = ({}) => {
	const { activeDate } = useDates();
	const { isMobile } = useTheme();
	return activeDate && (isMobile ? <MobileDrawer /> : <PersistentDrawer />);
};

export default ScheduleDrawer;
