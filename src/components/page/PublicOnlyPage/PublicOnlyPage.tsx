import * as React from 'react';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import BasePage, { PageProps } from '../BasePage/BasePage';
import LoginMenu from 'components/menus/LoginMenu/LoginMenu';

const PublicOnlyPage = (props: PageProps) => {
	const { push } = useRouter();
	const { user } = useAuth();

	if (user) {
		user.email_verified ? push('/tour') : push('/verify');
		return null;
	}

	return <BasePage {...props} headerMenu={<LoginMenu />} />;
};

export default PublicOnlyPage;
