import React from 'react';
import { useAuth } from 'context/AuthContext';
import BaseMenu from 'components/core/menu/BaseMenu/BaseMenu';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import BaseMenuItem from 'components/core/menu/BaseMenuItem/BaseMenuItem';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import { Box, Divider, Hidden } from '@mui/material';
import { AccountCircle, Groups2 } from '@mui/icons-material';
import { useRouter } from 'next/router';

const MainMenu = ({}) => {
	const { user } = useAuth();
	const { push } = useRouter();

	return (
		user && (
			<BaseMenu>
				<Hidden smUp>
					<BaseMenuItem>
						<Box padding={1}>
							<BandSelector />
						</Box>
					</BaseMenuItem>
					<Divider />
				</Hidden>
				<BaseMenuItem onClick={() => push('/account')} icon={<AccountCircle />}>
					Account
				</BaseMenuItem>
				<LogoutBtn />
			</BaseMenu>
		)
	);
};

export default MainMenu;
