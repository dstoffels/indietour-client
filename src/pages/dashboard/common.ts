import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

export const getDashboardProps = async (context: GetServerSidePropsContext) => {
	const { req } = context;

	const response = await axios.get('http://127.0.0.1:8000/api/bands?include=tours', {
		headers: {
			Cookie: req.headers.cookie,
		},
	});

	const initBands = (await response.data) || [];

	return { props: { initBands } };
};
