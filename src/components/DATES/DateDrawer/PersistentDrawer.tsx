import { Drawer } from '@mui/material';
import { Ref, forwardRef } from 'react';
import { useDates } from 'context/dateContext';
import { useTheme } from 'context/themeContext';
import { DateDrawerProps } from './DateDrawer';
import DrawerContent from './DrawerContents';

const PersistentDrawer = forwardRef(
	({ fetchDatesQuery, defaultDateFields }: DateDrawerProps, ref: Ref<HTMLElement>) => {
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
				<DrawerContent
					ref={ref}
					defaultDateFields={defaultDateFields}
					fetchDatesQuery={fetchDatesQuery}
				/>
			</Drawer>
		);
	},
);

export default PersistentDrawer;
