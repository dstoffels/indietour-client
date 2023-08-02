import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useTours } from './TourContext';
import { useDates } from './DateContext';

interface GlobalContextValues {
	activeEditField: string | null;
	setActiveEditField: (editField: string | null) => any;
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

const GlobalProvider = ({ children }: PropsWithChildren) => {
	const { activeTour } = useTours();
	const { activeDate } = useDates();

	const [activeEditField, setActiveEditField] = useState<string | null>(null);

	useEffect(() => {
		activeEditField && setActiveEditField(null);
	}, [activeDate, activeTour]);

	return (
		<GlobalContext.Provider value={{ activeEditField, setActiveEditField }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;

export const useGlobals = () => useContext<GlobalContextValues>(GlobalContext);
