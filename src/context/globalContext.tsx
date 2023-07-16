import { Band } from 'hooks/useBand';
import { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';

class GlobalContextProps {
	activeBand: Band | null = null;
	setActiveBand = (band: Band | null) => {};
	activeTour = null;
	setActiveTour = (tour: any) => {};
	activeDate = null;
	setActiveDate = (date: any) => {};
}

export const GlobalContext = createContext(new GlobalContextProps());

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
	const [activeBand, setActiveBand] = useState<Band | null>(null);
	const [activeTour, setActiveTour] = useState(null);
	const [activeDate, setActiveDate] = useState(null);

	return (
		<GlobalContext.Provider
			value={{ activeBand, setActiveBand, activeTour, setActiveTour, activeDate, setActiveDate }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
