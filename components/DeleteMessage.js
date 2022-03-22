import React from 'react';
import styled from 'styled-components';
import { Delete } from '@material-ui/icons';
import { organizationIdState } from '../atoms/organizationAtom';
import { channelIdState } from '../atoms/channelAtom';
import { useRecoilValue } from 'recoil';
import { deleteMessage } from '../helpers/helpers';

function DeleteMessage({ id }) {
	const orgId = useRecoilValue(organizationIdState);
	const channelId = useRecoilValue(channelIdState);

	const byeMessage = async () => {
		deleteMessage(orgId, channelId, id);
	};

	return (
		<DeleteMessageContainer onClick={byeMessage}>
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
		background-color: var(--secondary-hover-color);
	}
	> .MuiSvgIcon-root {
		font-size: 1rem;
	}
`;
