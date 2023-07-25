import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import * as React from 'react';
import { useState, useEffect } from 'react';

const AccountPage = () => {
	return (
		<PrivatePage>
			<h1>My Account</h1>
			<h2>Account Details</h2>
			<h2>Change Password</h2>
			<h2>Delete Account/Danger Zone?</h2>
		</PrivatePage>
	);
};

export default AccountPage;
