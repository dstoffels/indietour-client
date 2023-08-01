import { Box, Button, Stack } from '@mui/material';
import ChangePWForm from 'components/auth/ChangePWForm/ChangePWForm';
import DangerZone from 'components/core/DangerZone/DangerZone';
import EditField from 'components/core/EditField/EditField';
import Panel from 'components/core/Panel/Panel';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import { useAuth } from 'context/authContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const AccountPage = () => {
	const { user, updateUser } = useAuth();

	return (
		<PrivatePage>
			<Stack spacing={2} padding={2}>
				<Panel
					title="My Account"
					footer={
						<DangerZone
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
			</Stack>
		</PrivatePage>
	);
};

export default AccountPage;
