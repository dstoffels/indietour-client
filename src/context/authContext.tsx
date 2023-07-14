import useLocalStorage from 'hooks/useLocalStorage';
import { createContext, useContext, useState } from 'react';
import api from 'utils/api';

const defaultContext: AuthContextOutput = {
	user: null,
	login: async function (credentials: LoginCredentials): Promise<void> {},
	logout: async function (): Promise<void> {},
};

const AuthContext = createContext<AuthContextOutput>(defaultContext);

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useLocalStorage<object | null>('user');

	const login = async (credentials: LoginCredentials) => {
		try {
			const response = await api.post('/auth/login', credentials);
			setUser(response.data);
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			const response = await api.post('/auth/logout');
			setUser(response.data);
		} catch (error: any) {
			console.log(error.response.data);
		}
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext<AuthContextOutput>(AuthContext);

export interface AuthContextOutput {
	user: object | null;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => Promise<void>;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegiserFormData {
	email: string;
	username: string;
	password: string;
	password2: string;
}
