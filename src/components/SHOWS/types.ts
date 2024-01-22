import internal from 'stream';
import { ShowStatus } from './StatusSelector/StatusSelector';
import { Venue } from 'hooks/useVenues';

export type Show = {
	id: string;
	date_id: string;
	venue: Venue;
	status: ShowStatus;
	hold: number;
	deal: string;
	hospitality: string;
	notes: string;
};
