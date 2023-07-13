import axios from 'axios';

const apiRoutes = axios.create({
	baseURL: '/api',
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiRoutes;
