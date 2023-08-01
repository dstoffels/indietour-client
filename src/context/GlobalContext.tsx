import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

interface GlobalContextValues {
	activeEditField: string | null;
	setActiveEditField: (editField: string | null) => any;
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

const GlobalProvider = ({ children }: PropsWithChildren) => {
	const [activeEditField, setActiveEditField] = useState<string | null>(null);

	return (
		<GlobalContext.Provider value={{ activeEditField, setActiveEditField }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;

export const useGlobals = () => useContext<GlobalContextValues>(GlobalContext);
