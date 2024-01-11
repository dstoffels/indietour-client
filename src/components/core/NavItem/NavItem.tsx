import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState, useEffect, PropsWithChildren } from 'react';

interface NavItemProps extends PropsWithChildren {
	to: string;
	disabled?: boolean;
}

const NavItem = ({ to, disabled = false, children }: NavItemProps) => {
	const { push, pathname } = useRouter();
	const selected = to === pathname;

	return (
		<Button onClick={() => push(to)} disabled={disabled}>
			<Typography color={selected ? 'secondary' : 'primary'}>{children}</Typography>
		</Button>
	);
};

export default NavItem;
