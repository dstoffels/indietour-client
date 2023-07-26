import * as React from 'react';
import BasePage, { PageProps } from '../BasePage/BasePage';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainMenu from 'components/menus/MainMenu/MainMenu';

const PrivatePage = (props: PageProps) => {
	const { user } = useAuth();
	const { push } = useRouter();

	if (!user) {
		push('/');
		return null;
	}

	if (!user.email_verified) {
		push('/verify');
		return null;
	}

	return <BasePage {...props} headerMenu={<MainMenu />} />;
};

export default PrivatePage;
