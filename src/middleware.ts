import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	let access = request.cookies.get('access');
	let headers;
	if (!access) {
		let refresh = request.cookies.get('refresh');
		const response = await fetch('http://127.0.0.1:8000/api/auth/refresh', {
			method: 'POST',
			body: JSON.stringify({ refresh: refresh?.value }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const refreshResponse = new NextResponse(response.body, {
			status: response.status,
			headers: response.headers,
		});

		access = refreshResponse.cookies.get('access');
		headers = refreshResponse.headers;
	}

	const body = (await request.text()) || null;

	let response = await fetch(`http://127.0.0.1:8000${request.nextUrl.pathname}`, {
		method: request.method,
		body,
		headers: {
			Authorization: `Bearer ${access?.value}`,
			'Content-Type': 'application/json',
		},
	});

	if (headers) {
		const nextRes = new NextResponse(response.body, {
			status: response.status,
			headers,
		});

		return nextRes;
	}

	return response;
}

export const config = {
	matcher: '/api/:path*',
};
