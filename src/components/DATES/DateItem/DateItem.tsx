import { Box, ListItem, ListItemButton, Stack, Theme, Typography } from '@mui/material';
import SideStack from 'components/core/SideStack/SideStack';
import { TourDate, useDates } from 'context/dateContext';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useTheme } from 'context/themeContext';

interface DateItemProps {
	tourdate: TourDate;
	activeDate: TourDate | null;
}

const DateItem = ({ tourdate, activeDate }: DateItemProps) => {
	const { push } = useRouter();
	const isActive = tourdate.id === activeDate?.id;

	const handleClick = () => {
		isActive ? push({ query: {} }) : push({ query: { date_id: tourdate.id } });
	};

	const fontStyle = tourdate.status !== 'CONFIRMED' ? 'italic' : '';

	const fontWeight = tourdate.status === 'CONFIRMED' ? '500' : 'inherit';

	const fontColor = getFontColor(tourdate);

	const date = tourdate.date;

	return (
		<ListItem disablePadding>
			<ListItemButton selected={isActive} onClick={handleClick}>
				<SideStack>
					<Stack textAlign="center">
						<Typography color={fontColor} fontStyle={fontStyle} fontWeight={fontWeight}>
							{dayjs(date).format('DD')} {dayjs(date).format('MMM')}
						</Typography>
						<Typography
							color={fontColor}
							fontStyle={fontStyle}
							fontWeight={fontWeight}
							variant="caption"
						>
							{dayjs(date).format('ddd')}
						</Typography>
					</Stack>
					<Stack textAlign="right">
						<Typography color={fontColor} fontStyle={fontStyle} fontWeight={fontWeight}>
							{tourdate.title || tourdate.place?.name}
						</Typography>
						<Typography
							color={fontColor}
							fontStyle={fontStyle}
							fontWeight={fontWeight}
							variant="caption"
						>
							{tourdate.place?.political_address}
						</Typography>
					</Stack>
				</SideStack>
			</ListItemButton>
		</ListItem>
	);
};

export default DateItem;

function getFontColor(tourdate: TourDate) {
	const { theme } = useTheme();

	const { status } = tourdate;
	switch (status) {
		case 'INQUIRED':
			return theme.palette.secondary.main;
		case 'HOLD':
			return theme.palette.info.main;
		case 'CHALLENGED':
			return theme.palette.warning.main;
		case 'OPTION':
			return theme.palette.success.main;
		case 'RELEASED':
			return theme.palette.action.disabled;
		case 'CANCELLED':
			return theme.palette.error.main;
		default:
			return 'inherit';
	}
}
