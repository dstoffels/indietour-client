import axios from 'axios';
import { parseCookies } from 'nookies';

const apiRoutes = axios.create({
	baseURL: '/api',
});

export default apiRoutes;
