import { Box, List, ListSubheader, Paper } from '@mui/material';
import { Ref, forwardRef, useEffect } from 'react';
import { useDates } from 'context/dateContext';
import { useTours } from 'context/tourContext';
import DateItem from 'components/DATES/DateItem/DateItem';
import { useTheme } from 'context/themeContext';
import NewDateForm, { NewDateFormProps } from '../NewDateForm/NewDateForm';
import PastDatesSwitch from '../PastDatesSwitch/PastDatesSwitch';

const DrawerContent = forwardRef((props: NewDateFormProps, ref: Ref<HTMLElement>) => {
	const { theme, headerHeight, footerHeight } = useTheme();
	const { activeTour } = useTours();
	const { dates, activeDate, fetchTourDates } = useDates();

	useEffect(() => {
		fetchTourDates();
	}, [activeTour]);

	if (!activeTour) return null;

	const dateItems = dates.map((tourdate) => (
		<DateItem key={`date-${tourdate.id}`} tourdate={tourdate} activeDate={activeDate} />
	));

	return (
		<Box
			position="relative"
			ref={ref}
			sx={{
				marginTop: `${headerHeight}px`,
				marginBottom: `${footerHeight}px`,
				height: '100%',
			}}
		>
			<Paper sx={{ height: '100%' }}>
				<List
					subheader={
						<ListSubheader>
							<NewDateForm {...props} />
						</ListSubheader>
					}
				>
					{dateItems}
				</List>
				<Box position="absolute" bottom={0} left={0} width="100%">
					<ListSubheader>
						<Box padding={1}>
							<PastDatesSwitch />
						</Box>
					</ListSubheader>
				</Box>
			</Paper>
		</Box>
	);
});

export default DrawerContent;
