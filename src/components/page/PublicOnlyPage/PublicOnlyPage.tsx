import * as React from 'react';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import BasePage, { PageProps } from '../BasePage/BasePage';
import LoginMenu from 'components/menus/LoginMenu/LoginMenu';

const PublicOnlyPage = (props: PageProps) => {
	const { push } = useRouter();
	const { user } = useAuth();

	if (user) {
		if (user.email_verified) {
			user.booking_mode ? push('/book') : push('/tour');
		}
		return null;
	}

	return <BasePage {...props} headerMenu={<LoginMenu />} />;
};

export default PublicOnlyPage;
