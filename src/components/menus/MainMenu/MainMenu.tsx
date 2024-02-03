import React from 'react';
import { useAuth } from 'context/AuthContext';
import BaseMenu from 'components/core/menu/BaseMenu/BaseMenu';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import BaseMenuItem from 'components/core/menu/BaseMenuItem/BaseMenuItem';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import { Box, Divider, Hidden, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useRouter } from 'next/router';
import ModeSwitch from 'components/prefs/ModeSwitch/ModeSwitch';
import SideStack from 'components/core/SideStack/SideStack';
import TourSelector from 'components/tours/TourSelector/TourSelector';

const MainMenu = ({}) => {
	const { user } = useAuth();
	const { push } = useRouter();

	return (
		user && (
			<SideStack>
				{user.is_tour_admin && (
					<Typography variant="overline">{user.booking_mode ? 'Booking' : 'Tour'}</Typography>
				)}
				<BaseMenu>
					<Hidden smUp>
						<BaseMenuItem>
							<Box padding={1}>
								<BandSelector />
							</Box>
						</BaseMenuItem>
						<Divider />
					</Hidden>
					<Hidden smUp>
						<BaseMenuItem>
							<Box padding={1}>
								<TourSelector />
							</Box>
						</BaseMenuItem>
						<Divider />
					</Hidden>
					<ModeSwitch />
					<BaseMenuItem onClick={() => push('/account')} icon={<AccountCircle />}>
						Account
					</BaseMenuItem>
					<LogoutBtn />
				</BaseMenu>
			</SideStack>
		)
	);
};

export default MainMenu;
