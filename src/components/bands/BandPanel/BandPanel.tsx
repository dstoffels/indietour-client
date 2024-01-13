import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import DangerZone from 'components/core/DangerZone/DangerZone';
import EditField from 'components/core/EditField/EditField';
import Panel from 'components/core/Panel/Panel';
import { useBands } from 'context/BandContext';
import { useDates } from 'context/DateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import CreateBanduserForm from '../CreateBanduserForm/CreateBanduserForm';
import UserItem from '../../core/UserItem/UserItem';
import { useTheme } from 'context/hemeContext';
import BanduserItem from '../BanduserItem/BanduserItem';
import FieldTitle from 'components/core/FieldTitle/FieldTitle';

const BandPanel = () => {
	const { theme } = useTheme();
	const { activeBand, updateBand, deleteBand, isBandAdmin } = useBands();
	const { activeDate } = useDates();

	const handleArchiveBand = async () => {
		await updateBand({ is_archived: !activeBand?.is_archived });
	};

	const title = `Band ${activeBand?.is_archived ? ' (Archived)' : ''}`;

	const banduserItems = activeBand?.bandusers?.map((banduser) => (
		<BanduserItem key={banduser.id} banduser={banduser} />
	));

	return (
		!activeDate &&
		activeBand && (
			<Panel
				title={title}
				footer={
					<DangerZone
						onDelete={deleteBand}
						confirmationText={activeBand.name}
						deleteBtnText="Delete Band"
					>
						<Button color="warning" fullWidth variant="text" onClick={handleArchiveBand}>
							{activeBand.is_archived ? 'Restore Band' : 'Archive Band'}
						</Button>
					</DangerZone>
				}
			>
				<EditField
					name="name"
					label="Name"
					value={activeBand.name}
					onChange={updateBand}
					canEdit={isBandAdmin}
				/>
				<Stack>
					<Typography color={theme.palette.info.main} variant="overline">
						Owner
					</Typography>
					<Typography>{activeBand.owner?.username}</Typography>
					<Typography variant="caption">{activeBand.owner?.email}</Typography>
				</Stack>
				<Box>
					<FieldTitle>Users</FieldTitle>
					<CreateBanduserForm />
					<Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>{banduserItems}</Box>
				</Box>
			</Panel>
		)
	);
};

export default BandPanel;
