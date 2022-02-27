import React from 'react';
import styled from 'styled-components';
import { DeleteOutlineOutlined, Delete } from '@material-ui/icons';
import { db } from '../firebase';
import { organizationIdState } from '../atoms/organizationAtom';
import { channelIdState } from '../atoms/channelAtom';
import { useRecoilValue } from 'recoil';
import { deleteDoc, doc } from 'firebase/firestore';

function DeleteMessage({ id }) {
	const orgId = useRecoilValue(organizationIdState);
	const channelId = useRecoilValue(channelIdState);

	const deleteMessage = async () => {
		const orgRef = doc(db, 'organizations', orgId);
		const channelRef = doc(orgRef, 'channels', channelId);
		await deleteDoc(doc(channelRef, 'messages', id));
	};

	return (
		<DeleteMessageContainer onClick={deleteMessage}>
			<Delete fontSize='medium' />
		</DeleteMessageContainer>
	);
}

export default DeleteMessage;

const DeleteMessageContainer = styled.div`
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
