import * as React from 'react';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';
import BasePage, { PageProps } from '../BasePage/BasePage';
import LoginMenu from 'components/menus/LoginMenu/LoginMenu';

const PublicOnlyPage = (props: PageProps) => {
	const { push } = useRouter();
	const { user } = useAuth();

	if (user) {
		user.email_verified ? push('/tour?status=confirmed,cancelled') : push('/verify');
		return null;
	}

	return <BasePage {...props} headerMenu={<LoginMenu />} />;
};

export default PublicOnlyPage;
