import UserItem from 'components/core/UserItem/UserItem';
import { useAuth } from 'context/AuthContext';
import { Banduser, useBands } from 'context/andContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface BanduserItemProps {
	banduser: Banduser;
}

const BanduserItem = ({ banduser }: BanduserItemProps) => {
	const { fetchUser } = useAuth();
	const { isBandAdmin, updateBanduser, deleteBanduser } = useBands();

	const handleAdmin = async (userData: Banduser) => {
		await updateBanduser(userData);
		await fetchUser();
	};

	return (
		<UserItem
			user={banduser}
			canEdit={isBandAdmin}
			onAdminChange={handleAdmin}
			onDelete={deleteBanduser}
		/>
	);
};

export default BanduserItem;
