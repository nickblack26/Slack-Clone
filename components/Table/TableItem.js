import React from 'react';
import styled from 'styled-components';
import { organizationIdState } from '../../atoms/organizationAtom';
import { orgInfoState } from '../../atoms/currentOrgInfo';
import { useRecoilState } from 'recoil';

function getFirstLetters(str) {
	const firstLetters = str
		.split(' ')
		.map((word) => word[0])
		.join('');

	return firstLetters;
}

const TableItem = ({ image, name, members, link, id, org }) => {
	const [orgId, setOrgId] = useRecoilState(organizationIdState);
	const [orgDescription, setOrgDescription] = useRecoilState(orgInfoState);
	const setImportantStuff = () => {
		console.log('set org id');
		setOrgId(id);
		setOrgDescription(org.data());
	};

	return (
		<ItemWrap href={link} onClick={setImportantStuff}>
			<ItemImage>{image ? getFirstLetters(image) : <></>}</ItemImage>
			<TeamInfoWrap>
				<TeamName>{name}</TeamName>
				<TeamMembers>
					{members} {members > 1 ? 'members' : 'member'}
				</TeamMembers>
			</TeamInfoWrap>
		</ItemWrap>
	);
};

export default TableItem;

const ItemWrap = styled.a`
	display: flex;
	align-items: center;
	padding: 1rem;
	border-bottom: 1px solid gray;
	text-decoration: none;
	color: inherit;
	:last-child {
		border: none;
	}

	:hover {
		background-color: #f9f9f9;
	}
`;

const ItemImage = styled.div`
	background-color: gray;
	color: white;
	padding: 0.5rem 0.25rem;
	border-radius: 0.25rem;
	font-size: 1.25rem;
	font-weight: 700;
`;

const TeamInfoWrap = styled.div`
	margin-left: 1rem;
`;

const TeamName = styled.div`
	font-size: 18px;
	font-weight: 600;
`;

const TeamMembers = styled.div`
	color: #616061;
	font-size: 14px;
`;
