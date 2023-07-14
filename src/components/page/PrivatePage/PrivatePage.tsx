import * as React from 'react';
import BasePage from '../BasePage/BasePage';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';

const PrivatePage = ({ children }: React.PropsWithChildren) => {
	const { user } = useAuth();
	const { push } = useRouter();
	!user && push('/');

	return <BasePage>{children}</BasePage>;
};

export default PrivatePage;
