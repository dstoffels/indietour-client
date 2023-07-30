import * as React from 'react';
import { Box, Hidden, Typography } from '@mui/material';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import DatesDrawer from 'components/DATES/DatesDrawer/DatesDrawer';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import TourSelector from 'components/tours/TourSelector/TourSelector';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Band } from 'context/bandContext';
import { TourDate, useDates } from 'context/dateContext';
import Main from 'components/core/Main/Main';
import dayjs from 'dayjs';
import { useTours } from 'context/tourContext';
import DatesDrawerBtn from 'components/DATES/DateDrawerBtn/DateDrawerBtn';

export interface MainPageProps extends PropsWithChildren {
	queryParams?: string;
	defaultDateFields?: TourDate;
}

const MainPage = ({ queryParams, defaultDateFields, children }: MainPageProps) => {
	const { activeTour } = useTours();
	const { activeDate, fetchDate } = useDates();
	const router = useRouter();

	const [drawerWidth, setDrawerWidth] = useState<number>(0);
	const drawerRef = useRef<HTMLDivElement | null>(null);

	const date_id = router.query.date_id as string;

	useEffect(() => {
		fetchDate(date_id);
	}, [date_id, activeTour]);

	useEffect(() => {
		if (drawerRef.current) {
			setDrawerWidth(drawerRef.current.clientWidth);
		}
	}, [drawerRef.current]);
	return (
		<PrivatePage
			headerChildren={
				<>
					<Hidden smDown>
						<BandSelector />
					</Hidden>
					<TourSelector />
				</>
			}
			footerChildren={<DatesDrawerBtn />}
		>
			<Box display="flex">
				<DatesDrawer
					ref={drawerRef}
					queryParams={queryParams}
					defaultDateFields={defaultDateFields}
				/>
				<Main
					drawerWidth={drawerWidth}
					header={
						<Typography padding={2} variant="h6">
							{activeDate && dayjs(activeDate?.date).format('dddd, DD MMMM, YYYY')}
						</Typography>
					}
				>
					{children}
				</Main>
			</Box>
		</PrivatePage>
	);
};

export default MainPage;
