import {
	MutableRefObject,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useTours } from './TourContext';
import { useDates } from './DateContext';
import { useTheme } from './ThemeContext';

interface GlobalContextValues {
	activeEditField: string | null;
	setActiveEditField: (editField: string | null) => any;
	dateDrawerRef: MutableRefObject<HTMLElement | null>;
	dateDrawerOpen: boolean;
	setDateDrawerOpen: (open: boolean) => any;
	scheduleDrawerRef: MutableRefObject<HTMLElement | null>;
	scheduleDrawerOpen: boolean;
	setScheduleDrawerOpen: (open: boolean) => any;
	marginLeft: string | number;
	marginRight: string | number;
	drawerTransition: string;
	mainWidth: number;
	mainRef: MutableRefObject<HTMLElement | null>;
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

const GlobalProvider = ({ children }: PropsWithChildren) => {
	const { isMobile, theme } = useTheme();
	const { activeTour } = useTours();
	const { activeDate } = useDates();

	const [activeEditField, setActiveEditField] = useState<string | null>(null);

	const [dateDrawerOpen, setDateDrawerOpen] = useState<boolean>(true);
	const [dateDrawerWidth, setDateDrawerWidth] = useState(0);
	const dateDrawerRef = useRef<HTMLElement | null>(null);
	const marginLeft = !isMobile && dateDrawerOpen ? `${dateDrawerWidth}px` : 0;

	const [scheduleDrawerOpen, setScheduleDrawerOpen] = useState(false);
	const [scheduleDrawerWidth, setScheduleDrawerWidth] = useState(0);
	const marginRight = !isMobile && scheduleDrawerOpen ? `${scheduleDrawerWidth}px` : 0;
	const scheduleDrawerRef = useRef<HTMLElement | null>(null);

	const [mainWidth, setMainWidth] = useState(0);
	const mainRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		dateDrawerRef?.current && setDateDrawerWidth(dateDrawerRef.current.clientWidth);
		scheduleDrawerRef?.current && setScheduleDrawerWidth(scheduleDrawerRef.current.clientWidth);
		mainRef?.current && setMainWidth(mainRef.current.clientWidth);
	}, [dateDrawerRef.current, scheduleDrawerRef.current, mainRef.current]);

	useEffect(() => {
		if (mainRef.current) {
			const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
				setMainWidth(entries[0].contentRect.width);
			});

			observer.observe(mainRef.current);
			return () => observer.unobserve(mainRef.current as Element);
		}
	}, [mainRef.current]);

	useEffect(() => {
		activeEditField && setActiveEditField(null);
	}, [activeDate, activeTour]);

	const drawerTransition = !dateDrawerOpen
		? theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
		  })
		: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
		  });

	return (
		<GlobalContext.Provider
			value={{
				activeEditField,
				setActiveEditField,
				dateDrawerRef,
				dateDrawerOpen,
				setDateDrawerOpen,
				scheduleDrawerRef,
				scheduleDrawerOpen,
				setScheduleDrawerOpen,
				marginLeft,
				marginRight,
				drawerTransition,
				mainWidth,
				mainRef,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;

export const useGlobals = () => useContext<GlobalContextValues>(GlobalContext);
