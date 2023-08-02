import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/DateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const ContactsPanel = ({}) => {
	const { activeDate } = useDates();
	return activeDate && <Panel title="Contacts"></Panel>;
};

export default ContactsPanel;
