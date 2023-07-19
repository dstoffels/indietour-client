import { Add } from '@mui/icons-material';
import { Box, Button, Collapse, Divider } from '@mui/material';
import NewBandForm from 'components/bands/NewBandForm/NewBandForm';
import Selector from 'components/core/selector/Selector/Selector';
import SelectorItem from 'components/core/selector/SelectorItem/SelectorItem';
import { useBands } from 'context/bandContext';
import { useEffect, useState } from 'react';

const BandSelector = ({}) => {
	const { activeBand, bands, setActiveBand, fetchBands } = useBands();

	if (!bands) return null;

	const [formOpen, setFormOpen] = useState(false);
	const toggleForm = () => setFormOpen(!formOpen);

	const selectorItems = bands.map((band) => (
		<SelectorItem onClick={() => setActiveBand(band.id)} key={`band-selector-${band.id}`}>
			{band.name}
		</SelectorItem>
	));

	useEffect(() => {
		setFormOpen(!activeBand);
	}, [activeBand]);

	useEffect(() => {
		fetchBands();
	}, []);

	return (
		<Box>
			<Collapse in={formOpen}>
				{formOpen && <NewBandForm onClose={toggleForm} autoFocus={formOpen} />}
			</Collapse>
			<Collapse in={!formOpen}>
				<Selector selected={activeBand?.name || 'Select a band'}>
					{selectorItems}
					<Divider />
					<SelectorItem disableBtn>
						<Button onClick={toggleForm} fullWidth startIcon={<Add />}>
							Add Band
						</Button>
					</SelectorItem>
				</Selector>
			</Collapse>
		</Box>
	);
};

export default BandSelector;
