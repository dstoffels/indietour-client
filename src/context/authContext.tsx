import { createContext, useContext, useEffect, useState } from 'react';
import api from 'utils/api';

export class AuthContextProps {
	user: User | null = null;
	login = async (credentials: LoginCredentials) => false;
	logout = async () => false;
	register = async (formData: RegisterFormData) => false;
	updateUser = async (data: object) => false;
}

const defaultContext = new AuthContextProps();

const AuthContext = createContext<AuthContextProps>(defaultContext);

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<User | null>(null);

	// useEffect(() => {
	// 	console.log(user);
	// }, [user]);

	const login = async (credentials: LoginCredentials) => {
		const response = await api.post('/auth/login', credentials);
		setUser(response.data);
		return true;
	};

	const register = async (formData: RegisterFormData) => {
		try {
			const response = await api.post('/auth/register', formData);
			setUser(response.data);
			return true;
		} catch (error) {
			throw error;
		}
	};

	const refresh = async () => {
		try {
			const response = await api.post('/auth/refresh');
			setUser(response.data);
			return true;
		} catch (error: any) {
			console.log(error.response.data);
			return false;
		}
	};

	const logout = async () => {
		const success = await refresh();
		if (success) {
			try {
				const response = await api.post('/auth/logout');
				setUser(null);
				return true;
			} catch (error: any) {
				console.log(error.response.data);
				return false;
			}
		}
		return false;
	};

	const updateUser = async (data: object) => {
		try {
			const response = await api.patch('/auth/user', data);
			setUser(response.data);
			return true;
		} catch (error: any) {
			console.log(error.response.data);
			return false;
		}
	};

	useEffect(() => {
		refresh();
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => useContext<AuthContextProps>(AuthContext);

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterFormData {
	email: string;
	username: string;
	password: string;
	password2: string;
}

export interface User {
	email: string;
	username: string;
	is_active: boolean;
	email_verified: boolean;
	active_band_id: string;
	active_tour_id: string;
}
