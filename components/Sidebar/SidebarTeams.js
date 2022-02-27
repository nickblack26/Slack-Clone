import React, { useState, useEffect } from 'react';
import SidebarTeam from './SidebarTeam';
import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import AddOrg from '../AddOrg';

function SidebarTeams() {
	const [orgs, setOrgs] = useState([]);

	useEffect(() => {
		console.time('Get Orgs');
		onSnapshot(
			query(collection(db, 'organizations'), orderBy('created', 'asc')),
			(org) => {
				setOrgs(org.docs);
			}
		);
		console.timeEnd('Get Orgs');
	}, []);

	return (
		<SidebarTeamsContainer>
			{orgs.map((org) => (
				<SidebarTeam key={org.id} id={org.id} name={org.data().name} />
			))}
			<AddOrg />
		</SidebarTeamsContainer>
	);
}

export default SidebarTeams;

const SidebarTeamsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-right: 1px solid var(--border-color);

	.MuiSvgIcon-root {
		margin-top: 1rem;
		font-size: 1.5rem;
		color: white;
		cursor: pointer;
	}
`;
