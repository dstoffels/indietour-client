import BandSelector from 'components/bands/BandSelector/BandSelector';
import Selector from 'components/core/selector/Selector/Selector';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import { useEffect } from 'react';
import api from 'utils/api';

const DashboardPage = ({}) => {
	return <PrivatePage headerChildren={<BandSelector />}>Dashboard</PrivatePage>;
};

export default DashboardPage;
