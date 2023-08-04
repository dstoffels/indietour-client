import EditField from 'components/core/EditField/EditField';
import Panel from 'components/core/Panel/Panel';
import { useBands } from 'context/BandContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const BandPanel = () => {
	const { activeBand, updateBand, isBandAdmin } = useBands();
	return (
		activeBand && (
			<Panel title="Band">
				<EditField
					name="name"
					label="Name"
					value={activeBand.name}
					onChange={updateBand}
					canEdit={isBandAdmin}
				/>
			</Panel>
		)
	);
};

export default BandPanel;
