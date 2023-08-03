import { useGlobals } from 'context/GlobalContext';
import { useTheme } from 'context/ThemeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import MobileDrawer from './MobileDrawer';
import PersistentDrawer from './PersistentDrawer';
import DrawerContents from './DrawerContents';

const ScheduleDrawer = ({}) => {
	const { isMobile } = useTheme();
	return isMobile ? (
		<MobileDrawer>
			<DrawerContents />
		</MobileDrawer>
	) : (
		<PersistentDrawer>
			<DrawerContents />
		</PersistentDrawer>
	);
};

export default ScheduleDrawer;
