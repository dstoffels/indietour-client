import { Box, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import SideStack from 'components/core/SideStack/SideStack';
import { TourDate } from 'context/dateContext';
import { useRouter } from 'next/router';

interface DateItemProps {
	tourdate: TourDate;
	activeDate: TourDate | null;
}

const DateItem = ({ tourdate, activeDate }: DateItemProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push({ query: { date_id: tourdate.id } });
	};

	const date = new Date(tourdate.date);

	const dateCard = (
		<Stack textAlign="center">
			<Typography variant="caption">
				{date.toLocaleDateString('en-US', { weekday: 'short' })}
			</Typography>
			<Typography>
				{date.toLocaleDateString('en-US', { day: '2-digit' })}{' '}
				{date.toLocaleDateString('en-US', { month: 'short' })}
			</Typography>
		</Stack>
	);

	return (
		<ListItem disablePadding>
			<ListItemButton selected={tourdate.id === activeDate?.id} onClick={handleClick}>
				<SideStack>
					{dateCard}
					<Stack textAlign="right">
						<Typography>{tourdate.title}</Typography>
						<Typography variant="caption">{tourdate.place.political_address}</Typography>
					</Stack>
				</SideStack>
			</ListItemButton>
		</ListItem>
	);
};

export default DateItem;
