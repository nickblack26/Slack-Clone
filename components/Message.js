import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InsertComment } from '@material-ui/icons/';
import MessageAction from './MessageAction';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import DeleteMessage from './DeleteMessage';
import Image from 'next/image';
import { useMemo } from 'react';

function Message({ id, message, created, user }) {
	const [userData, setUserData] = useState({});

	const getUserData = async () => {
		const userRef = doc(db, 'users', user);
		const docSnap = await getDoc(userRef);
		if (docSnap.exists()) {
			setUserData(docSnap.data());
		} else {
			console.log('No such document!');
		}
	};

	const userImage = useMemo(() => {}, []);

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<MessageContainer>
			{userData.image ? (
				<MessageImage src={userData.image} height={36} width={36} />
			) : null}
			<div>
				<SenderInfo>
					<h4>{userData?.name}</h4>
					<MessageDate>
						{new Date(created?.toDate()).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</MessageDate>
				</SenderInfo>
				<MessageText>{message}</MessageText>
			</div>
			<MessageActionsWrap>
				<MessageAction id={id} Icon={InsertComment} threadOption />
				<DeleteMessage id={id} />
			</MessageActionsWrap>
		</MessageContainer>
	);
}

export default Message;

const MessageText = styled.p`
	font-size: 15px;
`;

const MessageActionsWrap = styled.div`
	visibility: hidden;
	display: flex;
	position: absolute;
	top: -1rem;
	right: 1rem;
	left: auto;
	bottom: auto;
	z-index: 1;
	border-radius: 0.5rem;
	overflow: hidden;
	padding: 0.18rem;
	border: 1px solid var(--border-color);
	background-color: var(--main-content);
`;

const MessageImage = styled(Image)`
	border-radius: 0.5rem;
`;

const MessageContainer = styled.div`
	display: flex;
	padding: 0.5rem 1rem;
	transition: all 100ms ease;
	position: relative;

	> span {
		margin-right: 0.5rem !important;
	}

	:hover {
		background-color: var(--secondary-hover-color);
	}
	:hover ${MessageActionsWrap} {
		visibility: visible;
	}
	:first-child {
		margin-top: 1.5rem;
	}
	:last-child {
		margin-bottom: 6rem;
	}
`;

const SenderInfo = styled.div`
	display: flex;
	align-items: flex-end;

	> h4 {
		font-size: 15px;
	}
`;

const MessageDate = styled.p`
	font-size: 12px;
	margin-left: 0.5rem;
	color: #636263;
`;
