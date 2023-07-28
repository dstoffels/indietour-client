import { Box, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import SideStack from 'components/core/SideStack/SideStack';
import { TourDate } from 'context/dateContext';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

interface DateItemProps {
	tourdate: TourDate;
	activeDate: TourDate | null;
}

const DateItem = ({ tourdate, activeDate }: DateItemProps) => {
	const router = useRouter();
	const isActive = tourdate.id === activeDate?.id;

	const handleClick = () => {
		isActive ? router.push({ query: {} }) : router.push({ query: { date_id: tourdate.id } });
	};

	const date = tourdate.date;

	const dateCard = (
		<Stack textAlign="center">
			<Typography>
				{dayjs(date).format('DD')} {dayjs(date).format('MMM')}
			</Typography>
			<Typography variant="caption">{dayjs(date).format('ddd')}</Typography>
		</Stack>
	);

	return (
		<ListItem disablePadding>
			<ListItemButton selected={isActive} onClick={handleClick}>
				<SideStack>
					{dateCard}
					<Stack textAlign="right">
						<Typography>{tourdate.title || tourdate.place?.name}</Typography>
						<Typography variant="caption">{tourdate.place?.political_address}</Typography>
					</Stack>
				</SideStack>
			</ListItemButton>
		</ListItem>
	);
};

export default DateItem;
