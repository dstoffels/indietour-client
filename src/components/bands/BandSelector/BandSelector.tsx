import { Add } from '@mui/icons-material';
import { Box, Button, Collapse, Divider } from '@mui/material';
import NewBandForm from 'components/bands/NewBandForm/NewBandForm';
import Selector from 'components/core/selector/Selector/Selector';
import SelectorItem from 'components/core/selector/SelectorItem/SelectorItem';
import { useBands } from 'context/bandContext';
import { useEffect, useState } from 'react';

const BandSelector = ({}) => {
	const { activeBand, bands, setActiveBand, createBand } = useBands();

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

	return (
		<Box>
			<Collapse in={formOpen}>
				<NewBandForm
					onClose={toggleForm}
					autoFocus={formOpen}
					bands={bands}
					createBand={createBand}
				/>
			</Collapse>
			<Collapse in={!formOpen}>
				<Selector selected={activeBand?.name || ''}>
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
