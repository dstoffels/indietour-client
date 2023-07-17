import { Box, Button, Collapse, Divider } from '@mui/material';
import Selector from 'components/core/selector/Selector/Selector';
import SelectorItem from 'components/core/selector/SelectorItem/SelectorItem';
import { useTours } from 'context/tourContext';
import { useEffect, useState } from 'react';
import NewTourForm from '../NewTourForm/NewTourForm';
import { Add } from '@mui/icons-material';

const TourSelector = ({}) => {
	const { tours, activeTour, setActiveTour } = useTours();

	const [formOpen, setFormOpen] = useState(false);

	const toggleForm = () => setFormOpen(!formOpen);

	const selectorItems = tours?.map((tour) => (
		<SelectorItem onClick={() => setActiveTour(tour.id)} key={`tour-selector-${tour.id}`}>
			{tour.name}
		</SelectorItem>
	));

	useEffect(() => {
		setFormOpen(!tours?.length);
	}, [activeTour]);

	return (
		<Box>
			<Collapse in={formOpen}>
				{formOpen && <NewTourForm onClose={toggleForm} autoFocus={formOpen} />}
			</Collapse>
			<Collapse in={!formOpen}>
				<Selector selected={activeTour?.name || 'Select A Tour'}>
					{selectorItems}
					<Divider />
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
