import * as React from 'react';
import BasePage from '../BasePage/BasePage';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivatePage = ({ children }: React.PropsWithChildren) => {
	const { user } = useAuth();
	const { push } = useRouter();

	useEffect(() => {
		!user && push('/');
	}, [user]);

	return <BasePage>{children}</BasePage>;
};

export default PrivatePage;
