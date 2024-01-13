import UserItem from 'components/core/UserItem/UserItem';
import { useAuth } from 'context/AuthContext';
import { Touruser, useTours } from 'context/TourContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface TouruserItemProps {
	touruser: Touruser;
}

const TouruserItem = ({ touruser }: TouruserItemProps) => {
	const { fetchUser } = useAuth();
	const { isTourAdmin, updateTouruser, deleteTouruser } = useTours();

	const handleAdmin = async (touruserData: Touruser) => {
		await updateTouruser(touruserData);
		await fetchUser();
	};

	return (
		<UserItem
			user={touruser}
			canEdit={isTourAdmin}
			onAdminChange={handleAdmin}
			onDelete={deleteTouruser}
		/>
	);
};

export default TouruserItem;
