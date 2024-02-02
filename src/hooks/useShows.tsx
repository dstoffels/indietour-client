import { Place, useDates } from 'context/DateContext';
import api from 'utils/api';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Show } from 'components/SHOWS/types';

const useShows = () => {
	const [statusOptions, setStatusOptions] = useState([]);
	const { activeDate, fetchDate } = useDates();

	const fetchStatusOptions = async () => {
		const response = await api.get('/shows/statuses');
		setStatusOptions(response.data);
	};

	const createShow = async (show: Partial<Show>) => {
		const response = await api.post(`/dates/${activeDate?.id}/shows`, show);
		fetchDate();
	};

	const updateShow = async (show_id: string | undefined, showData: Partial<Show>) => {
		const response = await api.patch(`/shows/${show_id}`, showData);
		fetchDate();
	};

	useEffect(() => {
		fetchStatusOptions();
	}, []);

	return { statusOptions, fetchStatusOptions, updateShow, createShow };
};

export default useShows;
