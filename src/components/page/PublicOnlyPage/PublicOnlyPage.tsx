import * as React from 'react';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';
import BasePage, { PageProps } from '../BasePage/BasePage';

const PublicOnlyPage = ({ headerChildren, children }: PageProps) => {
	const { push } = useRouter();
	const { user } = useAuth();

	if (user) {
		push('/tour');
		return null;
	}

	return <BasePage headerChildren={headerChildren}>{children}</BasePage>;
};

export default PublicOnlyPage;
