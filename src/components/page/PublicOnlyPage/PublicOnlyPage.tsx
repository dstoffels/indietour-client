import * as React from 'react';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';
import BasePage, { PageProps } from '../BasePage/BasePage';

const PublicOnlyPage = ({ headerChildren, footerChildren, children }: PageProps) => {
	const { push } = useRouter();
	const { user } = useAuth();

	if (user) {
		user.email_verified ? push('/tour') : push('/verify');
		return null;
	}

	return (
		<BasePage headerChildren={headerChildren} footerChildren={footerChildren}>
			{children}
		</BasePage>
	);
};

export default PublicOnlyPage;
