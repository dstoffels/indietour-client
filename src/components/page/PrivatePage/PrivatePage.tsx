import * as React from 'react';
import BasePage, { PageProps } from '../BasePage/BasePage';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainMenu from 'components/menus/MainMenu/MainMenu';
import NavItem from 'components/core/NavItem/NavItem';

const PrivatePage = (props: PageProps) => {
	const { user, loaded } = useAuth();
	const { push } = useRouter();

	useEffect(() => {
		if (loaded) {
			if (!user) push('/');
			else if (!user.email_verified) push('/verify');
		}
	}, [user]);

	return user && <BasePage {...props} headerMenu={<MainMenu />} />;
};

export default PrivatePage;
