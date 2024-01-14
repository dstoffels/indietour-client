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
import { useAuth } from './AuthContext';

interface GlobalContextValues {
	activeEditField: number;
	setActiveEditField: (editField: number) => any;
	dateDrawerRef: MutableRefObject<HTMLElement | null>;
	dateDrawerOpen: boolean;
	toggleDateDrawer: () => any;
	scheduleDrawerRef: MutableRefObject<HTMLElement | null>;
	scheduleDrawerOpen: boolean;
	toggleScheduleDrawer: (open: boolean) => any;
	marginLeft: string | number;
	marginRight: string | number;
	drawerTransition: string;
	mainWidth: number;
	mainRef: MutableRefObject<HTMLElement | null>;
}

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

const GlobalProvider = ({ children }: PropsWithChildren) => {
	const { theme } = useTheme();
	const { user, updateUser } = useAuth();

	const [activeEditField, setActiveEditField] = useState<number>(0);

	const dateDrawerOpen = Boolean(user?.show_dates_list);
	const toggleDateDrawer = async () =>
		await updateUser({ show_dates_list: !user?.show_dates_list });
	const [dateDrawerWidth, setDateDrawerWidth] = useState(0);
	const dateDrawerRef = useRef<HTMLElement | null>(null);
	const marginLeft = dateDrawerOpen ? `${dateDrawerWidth}px` : 0;

	const scheduleDrawerOpen = Boolean(user?.show_schedule_list);
	const toggleScheduleDrawer = async () =>
		await updateUser({ show_schedule_list: !user?.show_schedule_list });
	const [scheduleDrawerWidth, setScheduleDrawerWidth] = useState(0);
	const marginRight = scheduleDrawerOpen ? `${scheduleDrawerWidth}px` : 0;
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
		}
	}, [mainRef.current]);

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
				toggleDateDrawer,
				scheduleDrawerRef,
				scheduleDrawerOpen,
				toggleScheduleDrawer,
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
