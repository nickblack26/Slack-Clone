import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { organizationIdState } from '../../atoms/organizationAtom';

function SidebarTeam({ name, id }) {
	const [organization, setOrganization] = useRecoilState(organizationIdState);

	function getFirstLetters(str) {
		const firstLetters = str
			.split(' ')
			.map((word) => word[0])
			.join('');

		return firstLetters;
	}

	return (
		<SidebarTeamContainer onClick={() => setOrganization(id)}>
			<SidebarTeamItem>
				{name ? getFirstLetters(name) : <></>}
			</SidebarTeamItem>
		</SidebarTeamContainer>
	);
}

export default SidebarTeam;

const SidebarTeamContainer = styled.a`
	padding: 1rem 0.5rem 0rem 0.5rem;
	cursor: pointer;
`;

const SidebarTeamItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #a1a1a3;
	color: #191b1e;
	height: 2.5rem;
	width: 2.5rem;
	border-radius: 0.5rem;
	font-weight: 600;
	font-size: 1.25rem;
	border: 1px transparent solid;
	text-transform: uppercase;

	:hover {
		border: 1px #cbcccd solid;
	}
`;
