import { Add, Cancel, Check, Close } from '@mui/icons-material';
import { Box, Button, Collapse, Divider, IconButton, TextField } from '@mui/material';
import NewBandForm from 'components/bands/NewBandForm/NewBandForm';
import Selector from 'components/core/selector/Selector/Selector';
import SelectorItem from 'components/core/selector/SelectorItem/SelectorItem';
import { useAuth } from 'context/authContext';
import { useBands } from 'hooks/useBand';
import { FormEvent, useEffect, useRef, useState } from 'react';

const BandSelector = ({}) => {
	const { user, updateUser } = useAuth();
	const { bands, fetchBands } = useBands();

	const [formOpen, setFormOpen] = useState(false);
	const toggleForm = () => setFormOpen(!formOpen);

	return (
		<Box>
			<Collapse in={formOpen}>
				<NewBandForm onClose={toggleForm} autoFocus={formOpen} />
			</Collapse>
			<Collapse in={!formOpen}>
				<Selector initSelection="Genevieve Heyward">
					<SelectorItem>Genevieve Heyward</SelectorItem>
					<SelectorItem>The Cancellations</SelectorItem>
					<SelectorItem>Scotch Bakula</SelectorItem>
					<SelectorItem>The Rifters</SelectorItem>
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
