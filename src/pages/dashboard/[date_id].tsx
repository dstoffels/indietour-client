import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import DashboardPage, { DashboardPageProps } from '.';
import { Band } from 'context/bandContext';
import { useRouter } from 'next/router';
import api from 'utils/api';
import axios from 'axios';
import { getDashboardProps } from './common';

const DateDashboardPage = ({ initBands }: DashboardPageProps) => {
	const router = useRouter();
	const date_id = router.query.date_id || '';

	return <DashboardPage initBands={initBands} date_id={date_id} />;
};

export default DateDashboardPage;

export const getServerSideProps: GetServerSideProps<{ initBands: Array<Band> }> = async (
	context: GetServerSidePropsContext,
) => getDashboardProps(context);
