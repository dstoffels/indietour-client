import { Place, TourDate, useDates } from 'context/DateContext';
import api from 'utils/api';
import * as React from 'react';
import { useState, useEffect } from 'react';

const useSchedule = () => {
	const { activeDate, fetchDate } = useDates();
	const { timeslots } = activeDate as TourDate;

	const [activeTimeslot, setActiveTimeslot] = useState<Timeslot | null>(null);
	const [types, setTypes] = useState<TimeslotType[]>([]);

	const createTimeslot = async (timeslotData: Timeslot) => {
		const response = await api.post(`/dates/${activeDate?.id}/timeslots`);
		fetchDate();
	};

	const updateTimeslot = async (timeslotData: Timeslot) => {
		if (activeTimeslot) {
			const response = await api.patch(`/timeslots/${activeTimeslot.id}`, timeslotData);
			fetchDate();
		}
	};

	const deleteTimeslot = async () => {
		const response = await api.delete(`/timeslots/${activeTimeslot?.id}`);
		fetchDate();
	};

	const fetchTimeslotTypes = async () => {
		const response = await api.get(`/timeslots/types`);
		setTypes(response.data);
	};

	useEffect(() => {
		fetchTimeslotTypes();
	}, []);

	return {
		timeslots,
		activeTimeslot,
		setActiveTimeslot,
		createTimeslot,
		updateTimeslot,
		deleteTimeslot,
		types,
	};
};

export default useSchedule;

export interface Timeslot {
	id?: string;
	title?: string;
	details?: string;
	type?: TimeslotType;
	start_time?: string;
	origin?: Place;
	start_after_midnight?: boolean;
	end_time?: string;
	destination?: Place;
	end_after_midnight?: boolean;
}

export type TimeslotType = 'Event' | 'Travel' | 'Flight' | 'Meeting' | undefined;
