import { Box, Button, Grid, Stack } from '@mui/material';
import ChangePWForm from 'components/auth/ChangePWForm/ChangePWForm';
import DangerZone from 'components/core/DangerZone/DangerZone';
import EditField from 'components/core/EditField/EditField';
import Panel from 'components/core/Panel/Panel';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import { useAuth } from 'context/AuthContext';
import { useGlobals } from 'context/GlobalContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

// TODO delete/deactivate acct
const AccountPage = () => {
	const { user, updateUser } = useAuth();
	const { mainRef } = useGlobals();

	return (
		<PrivatePage>
			<Box ref={mainRef} padding={1}>
				<Grid container rowSpacing={1} columnSpacing={2} justifyContent="center">
					<Panel
						title="My Account"
						footer={
							<DangerZone
								onDelete={() => console.log('test')}
								deleteBtnText="DELETE ACCOUNT"
								confirmationText={`delete ${user?.email}`}
								popoverText="Your account and any bands and tours that you own will be permanently deleted!"
							>
								<Button color="warning">Deactivate</Button>
							</DangerZone>
						}
					>
						<EditField value={user?.email} onChange={updateUser} name="email" fullWidth />
						<EditField
							value={user?.username}
							onChange={updateUser}
							name="username"
							canEdit
							fullWidth
						/>
					</Panel>
					<Panel title="Change Password">
						<ChangePWForm />
					</Panel>
				</Grid>
			</Box>
		</PrivatePage>
	);
};

export default AccountPage;
