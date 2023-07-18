import { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { User, useAuth } from './authContext';
import api from 'utils/api';
import BandProvider, { Band, useBands } from './bandContext';
import { useTours } from './tourContext';

interface DateContextValues {
	activeDate: TourDate;
}

interface DateProviderProps extends PropsWithChildren {}

const DateContext = createContext<DateContextValues>({} as DateContextValues);

const DateProvider = ({ children }: DateProviderProps) => {
	return <DateContext.Provider value={{}}>{children}</DateContext.Provider>;
};

export default DateProvider;

export class TourDate {
	id = '';
	date = Date();
	place = new Place();
	title = '';
	notes = '';
	status = '';
	hold = 0;
	shows = [];
	timeslots = [];
	lodgings = [];
	contacts = [];
	tour_id = '';
}

export class Place {
	id = '';
	name = '';
	formatted_address = '';
	political_address = '';
	lat = 0.0;
	lng = 0.0;
	overview = '';
	types: string[] = [];
	business_status = '';
	website = '';
}
