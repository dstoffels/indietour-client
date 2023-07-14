import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	let access = request.cookies.get('access');
	let cookies = '';

	if (!access) {
		let refresh = request.cookies.get('refresh');
		if (refresh) {
			// auto refresh request
			const response = await fetch('http://127.0.0.1:8000/api/auth/refresh', {
				method: 'POST',
				body: JSON.stringify({ refresh: refresh?.value }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			cookies = response.headers.get('Set-Cookie') || cookies;
		} else {
			// return TODO: response to nullify user in localstorage on client goes here? :)
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

	let response = await fetch(`http://127.0.0.1:8000${request.nextUrl.pathname}`, {
		method: request.method,
		body,
		headers,
	});

	if (cookies) response.headers.set('Set-Cookie', cookies);

	return response;
}

export const config = {
	matcher: '/api/:path*',
};
