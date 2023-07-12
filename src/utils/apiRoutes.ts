import axios from 'axios';

const apiRoutes = axios.create({
	baseURL: '/api',
});

export default apiRoutes;
