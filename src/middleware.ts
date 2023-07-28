import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	let access = request.cookies.get('access');
	let cookies = '';

	if (!access && !request.nextUrl.pathname.includes('/api/auth')) {
		let refresh = request.cookies.get('refresh');
		if (refresh) {
			// auto refresh request
			const response = await fetch('http://127.0.0.1:8000/api/auth/refresh', {
				method: 'POST',
				headers: request.headers,
			});
			cookies = response.headers.get('Set-Cookie') || cookies;
		}
	}

	const headers = !cookies
		? request.headers
		: {
				'Content-Type': 'application/json',
				Cookie: cookies,
		  };

	// initial request
	const body = (await request.text()) || null;
	const queryParams = request.nextUrl.searchParams;

	let response = await fetch(
		`http://127.0.0.1:8000${request.nextUrl.pathname}${queryParams ? '?' + queryParams : ''}`,
		{
			method: request.method,
			body,
			headers,
		},
	);

	if (cookies) response.headers.set('Set-Cookie', cookies);

	return response;
}

export const config = {
	matcher: '/api/:path*',
};
