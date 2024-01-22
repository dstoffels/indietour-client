import { Box, ListItem, ListItemButton, Stack, Theme, Typography } from '@mui/material';
import SideStack from 'components/core/SideStack/SideStack';
import { TourDate, useDates } from 'context/DateContext';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useTheme } from 'context/ThemeContext';
import { useGlobals } from 'context/GlobalContext';

interface DateItemProps {
	tourdate: TourDate;
	activeDate: TourDate | null;
}

const DateItem = ({ tourdate, activeDate }: DateItemProps) => {
	const { push, query } = useRouter();
	const { isMobile } = useTheme();
	const { toggleDateDrawer } = useGlobals();

	const isActive = tourdate.id === activeDate?.id;

	const handleClick = () => {
		isActive ? push({ query: {} }) : push({ query: { ...query, date_id: tourdate.id } });
		isMobile && toggleDateDrawer();
	};

	const fontStyle = tourdate.is_published ? '' : 'italic';

	const fontWeight = tourdate.is_show_day ? '500' : 'inherit';

	const date = tourdate.date;

	return (
		<ListItem disablePadding>
			<ListItemButton selected={isActive} onClick={handleClick}>
				<SideStack width="100%">
					<Stack textAlign="center" marginRight={2}>
						<Typography fontStyle={fontStyle} fontWeight={fontWeight}>
							{dayjs(date).format('DD')} {dayjs(date).format('MMM')}
						</Typography>
						<Typography fontStyle={fontStyle} fontWeight={fontWeight} variant="caption">
							{dayjs(date).format('ddd')}
						</Typography>
					</Stack>
					<Stack textAlign="right">
						<Typography fontStyle={fontStyle} fontWeight={fontWeight}>
							{tourdate.title || tourdate.place?.name}
						</Typography>
						<Typography fontStyle={fontStyle} fontWeight={fontWeight} variant="caption">
							{tourdate.place?.political_address}
						</Typography>
					</Stack>
				</SideStack>
			</ListItemButton>
		</ListItem>
	);
};

export default DateItem;
