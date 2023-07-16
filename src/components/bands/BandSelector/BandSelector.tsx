import { Add, Cancel, Check, Close } from '@mui/icons-material';
import { Box, Button, Collapse, Divider, IconButton, TextField, useForkRef } from '@mui/material';
import NewBandForm from 'components/bands/NewBandForm/NewBandForm';
import Selector from 'components/core/selector/Selector/Selector';
import SelectorItem from 'components/core/selector/SelectorItem/SelectorItem';
import { useAuth } from 'context/authContext';
import { useBands } from 'hooks/useBand';
import { FormEvent, useEffect, useRef, useState } from 'react';

const BandSelector = ({}) => {
	const { activeBand, bands, fetchBands, setActiveBand, createBand } = useBands();

	useEffect(() => {
		fetchBands();
	}, []);

	const [formOpen, setFormOpen] = useState(true);
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
