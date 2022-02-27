import React from 'react';
import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import {
	ExpandMore,
	Add,
	InsertCommentRounded,
	AddCircleRounded,
	QuestionAnswerRounded,
	NotesRounded,
	LayersRounded,
	BookmarkBorderRounded,
	MoreVertRounded,
} from '@material-ui/icons/';
import SidebarOption from './SidebarOption';
import { doc, getDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { onSnapshot, collection } from 'firebase/firestore';
import { organizationIdState } from '../../atoms/organizationAtom';

function SidebarInfo() {
	const [channels, setChannels] = useState([]);
	const [orgName, setOrgName] = useState('');
	const organizationId = useRecoilValue(organizationIdState);
	const organizationRef = doc(db, 'organizations', organizationId);

	const getChannels = async () => {
		onSnapshot(
			query(
				collection(organizationRef, 'channels'),
				orderBy('created', 'asc')
			),
			(channel) => {
				setChannels(channel.docs);
			}
		);
	};

	const getOrgName = async () => {
		const docSnap = await getDoc(organizationRef);
		if (docSnap.exists()) {
			setOrgName(docSnap.data().name);
		} else {
			console.log('No such document!');
		}
	};

	useEffect(() => {
		console.time('Get Channels');
		getChannels();
		console.timeEnd('Get Channels');
		console.time('Get Org Name');
		getOrgName();
		console.timeEnd('Get Org Name');
	}, [organizationId]);

	return (
		<SidebarContainer>
			<SidebarTeamHeader>
				<div>
					<h2>{orgName}</h2>
				</div>
				<button>
					<CreateIcon />
				</button>
			</SidebarTeamHeader>
			<SidebarNavigation>
				<SidebarOption Icon={InsertCommentRounded} title='Threads' />
				<SidebarOption Icon={NotesRounded} title='All unreads' />
				<SidebarOption Icon={QuestionAnswerRounded} title='All DMs' />
				<SidebarOption
					Icon={BookmarkBorderRounded}
					title='Saved items'
				/>
				<SidebarOption Icon={LayersRounded} title='File browser' />
				<SidebarOption Icon={MoreVertRounded} title='More' />
				<SidebarOption Icon={ExpandMore} title='Channels' />
				{channels?.map((channel) => (
					<SidebarOption
						key={channel.id}
						id={channel.id}
						title={channel.data().name}
					/>
				))}
				<SidebarOption
					Icon={AddCircleRounded}
					addChannelOption
					title='Add Channel'
				/>
			</SidebarNavigation>
		</SidebarContainer>
	);
}

export default SidebarInfo;

const SidebarContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;

	> .MuiSvgIcon-root {
		padding: 8px;
		color: #49274b;
		font-size: 18px;
		background-color: white;
		border-radius: 999px;
	}

	> hr {
		border: 1px solid var(--border-color);
	}
`;

const SidebarTeamHeader = styled.div`
	display: flex;
	height: 50px;
	align-items: center;
	padding: 0rem 1rem;
	border-bottom: 1px solid var(--border-color);

	> div {
		display: flex;
		max-width: 100%;
		flex: 0.7;
	}

	> div > h2 {
		font-size: 1rem;
		min-width: 0;
		font-weight: 900;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		display: block;
	}

	> button {
		flex: 0.3;
	}

	.MuiSvgIcon-root {
		flex: 0.3
		font-size: 0.75rem;
		background-color: white;
		color: black;
		padding: 0.25rem;
		border-radius: 50%;
		align-self: center;
	}
`;

const SidebarNavigation = styled.div`
	padding: 0.5rem 0rem;
`;
