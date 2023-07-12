import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

const api = axios.create({
	baseURL: 'http://127.0.0.1:8000',
});

const getAuthHeader = (req: NextApiRequest) => {
	const cookies = parseCookies({ req });
	const access = cookies['jwt-access'];
	return { Authorization: access ? `Bearer ${access}` : '' };
};

export default api;

export const useHandler =
	(path: string, method = 'GET', authorized = true) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			const response = await api.request({
				url: path,
				method,
				headers: getAuthHeader(req),
			});

			res.status(response.status).json(response.data);
		} catch (error) {
			res.send(error);
		}
	};

// export const useCollectionHandler =
// 	(path: string, authorized = true) =>
// 	async (req: NextApiRequest, res: NextApiResponse) => {
// 		try {
// 			const;
// 		} catch (error) {}
// 	};
