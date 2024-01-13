import { Box, Button, Collapse, Divider } from '@mui/material';
import Selector from 'components/core/selector/Selector/Selector';
import SelectorItem from 'components/core/selector/SelectorItem/SelectorItem';
import { useTours } from 'context/ourContext';
import { useEffect, useState } from 'react';
import NewTourForm from '../NewTourForm/NewTourForm';
import { Add } from '@mui/icons-material';
import { useBands } from 'context/BandContext';
import ArchivedToursSwitch from '../ArchivedToursSwitch/ArchivedToursSwitch';
import { useAuth } from 'context/AuthContext';

const TourSelector = ({}) => {
	const { user } = useAuth();
	const { tours, activeTour, setActiveTour } = useTours();
	const { activeBand, fetchBands } = useBands();

	const [formOpen, setFormOpen] = useState(false);

	if (!activeBand) return null;

	const toggleForm = () => setFormOpen(!formOpen);

	const selectorItems = tours?.map((tour) => (
		<SelectorItem onClick={() => setActiveTour(tour.id)} key={`tour-selector-${tour.id}`}>
			{tour.name}
		</SelectorItem>
	));

	return (
		<Box>
			<Collapse in={formOpen}>
				{formOpen && <NewTourForm onClose={toggleForm} autoFocus={formOpen} />}
			</Collapse>
			<Collapse in={!formOpen}>
				<Selector selected={activeTour?.name || 'Select a Tour'}>
					{selectorItems}
					<Divider />
					<ArchivedToursSwitch />
					<SelectorItem disableBtn>
						<Button onClick={toggleForm} fullWidth startIcon={<Add />}>
							Add Tour
						</Button>
					</SelectorItem>
				</Selector>
			</Collapse>
		</Box>
	);
};

export default TourSelector;
