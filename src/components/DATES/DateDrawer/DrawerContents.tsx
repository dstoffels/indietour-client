import { Box, Collapse, List, ListSubheader, Paper } from '@mui/material';
import { Ref, forwardRef, useEffect, useRef } from 'react';
import { useDates } from 'context/DateContext';
import { useTours } from 'context/TourContext';
import DateItem from 'components/DATES/DateItem/DateItem';
import { useTheme } from 'context/ThemeContext';
import NewDateForm, { NewDateFormProps } from '../NewDateForm/NewDateForm';
import PastDatesSwitch from '../PastDatesSwitch/PastDatesSwitch';
import { useGlobals } from 'context/GlobalContext';

const DrawerContent = (props: NewDateFormProps) => {
	const { headerHeight, footerHeight } = useTheme();
	const { dateDrawerRef, marginLeft } = useGlobals();
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
			ref={dateDrawerRef}
			position="relative"
			sx={{
				marginTop: `${headerHeight}px`,
				marginBottom: `${footerHeight}px`,
				height: '100%',
			}}
		>
			<Paper sx={{ height: '100%' }}>
				<List
					subheader={<ListSubheader>{<NewDateForm {...props} />}</ListSubheader>}
					sx={{ paddingBottom: `${footerHeight}px` }}
				>
					{dateItems}
				</List>

				<Box position="fixed" bottom={footerHeight} left={0} width={marginLeft || '100%'}>
					<ListSubheader>
						<Box padding={1}>
							<PastDatesSwitch />
						</Box>
					</ListSubheader>
				</Box>
			</Paper>
		</Box>
	);
};

export default DrawerContent;
