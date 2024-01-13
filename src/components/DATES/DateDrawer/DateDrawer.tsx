import * as React from 'react';
import MobileDrawer from './MobileDrawer';
import PersistentDrawer from './PersistentDrawer';
import { NewDatePropsWithChildren } from '../NewDateForm/NewDateForm';
import { useTheme } from 'context/ThemeContext';

const DateDrawer = (props: NewDatePropsWithChildren) => {
	const { isMobile } = useTheme();

	return isMobile ? <MobileDrawer {...props} /> : <PersistentDrawer {...props} />;
};

export default DateDrawer;
