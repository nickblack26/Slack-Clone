import React from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { InsertComment } from '@material-ui/icons/';
import { doc, getDoc } from 'firebase/firestore';
import { organizationIdState } from '../atoms/organizationAtom';
import { channelIdState } from '../atoms/channelAtom';
import { useRecoilValue } from 'recoil';

function MessageAction({ id, Icon, threadOption }) {
	const orgId = useRecoilValue(organizationIdState);
	const channelId = useRecoilValue(channelIdState);

	const startThread = async () => {
		const orgRef = doc(db, 'organizations', orgId);
		const channelRef = doc(orgRef, 'channels', channelId);
		const messageRef = doc(channelRef, 'messages', id);
		const docSnap = await getDoc(messageRef);
		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log('No such document!');
		}
	};

	return (
		<MessageActionContainer onClick={startThread}>
			{Icon && <InsertComment fontSize='small' />}
		</MessageActionContainer>
	);
}

export default MessageAction;

const MessageActionContainer = styled.div`
	padding: 0.5rem;
	cursor: pointer;
	border-radius: 0.25rem;
	:hover {
		background-color: var(--hover-color);
	}
	> .MuiSvgIcon-root {
		font-size: 1rem;
	}
`;
