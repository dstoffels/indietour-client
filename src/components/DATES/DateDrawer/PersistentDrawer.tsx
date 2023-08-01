import { Drawer } from '@mui/material';
import { Ref, forwardRef } from 'react';
import { useDates } from 'context/dateContext';
import { useTheme } from 'context/themeContext';
import DrawerContent from './DrawerContents';
import { NewDateFormProps } from '../NewDateForm/NewDateForm';

const PersistentDrawer = forwardRef((props: NewDateFormProps, ref: Ref<HTMLElement>) => {
	const { theme } = useTheme();
	const { drawerOpen, setDrawerOpen } = useDates();

	const toggleDrawer = () => setDrawerOpen(!drawerOpen);

	return (
		<Drawer
			sx={{ zIndex: theme.zIndex.drawer - 1 }}
			anchor="left"
			open={drawerOpen}
			onClose={toggleDrawer}
			hideBackdrop
			variant="persistent"
		>
			<DrawerContent ref={ref} {...props} />
		</Drawer>
	);
});

export default PersistentDrawer;
