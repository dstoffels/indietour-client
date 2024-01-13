import { Box, ListItem, ListItemButton, Stack, Theme, Typography } from '@mui/material';
import SideStack from 'components/core/SideStack/SideStack';
import { TourDate, TourDateStatusOptions, useDates } from 'context/DateContext';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useTheme } from 'context/hemeContext';
import { getStatusColor } from '../StatusSelector/StatusSelector';

interface DateItemProps {
	tourdate: TourDate;
	activeDate: TourDate | null;
}

const DateItem = ({ tourdate, activeDate }: DateItemProps) => {
	const { push, query } = useRouter();
	const isActive = tourdate.id === activeDate?.id;

	const handleClick = () => {
		isActive ? push({ query: {} }) : push({ query: { ...query, date_id: tourdate.id } });
	};

	const fontStyle = tourdate.status !== 'CONFIRMED' ? 'italic' : '';

	const fontWeight = tourdate.status === 'CONFIRMED' ? '500' : 'inherit';

	const fontColor = getStatusColor(tourdate.status as TourDateStatusOptions);

	const date = tourdate.date;

	return (
		<ListItem disablePadding>
			<ListItemButton selected={isActive} onClick={handleClick}>
				<SideStack width="100%">
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
