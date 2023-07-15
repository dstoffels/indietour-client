import * as React from 'react';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';
import BasePage from '../BasePage/BasePage';

const PublicPage = ({ children }: React.PropsWithChildren) => {
	const { push } = useRouter();
	const { user } = useAuth();
	if (user) {
		push('/dashboard');
		return null;
	}

	return <BasePage>{children}</BasePage>;
};

export default PublicPage;
