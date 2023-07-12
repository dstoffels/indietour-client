import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import api from 'utils/api';

export async function middleware(request: NextRequest) {
	const access = request.cookies.get('jwt-access');
	const body = (await request.text()) || null;

	return await fetch(`http://127.0.0.1:8000${request.nextUrl.pathname}`, {
		method: request.method,
		body,
		headers: {
			Authorization: `Bearer ${access?.value}`,
			'Content-Type': 'application/json',
		},
	});
}

export const config = {
	matcher: '/api/:path*',
};
