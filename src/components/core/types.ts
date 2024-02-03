export type Place = {
	place_id: string;
	name: string;
	formatted_address: string;
	business_status: string;
	geometry: {
		location: {
			lat: number;
			lng: number;
		};
	};
	types: string[];
	website: string;
};
