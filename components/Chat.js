import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import {
	doc,
	collection,
	query,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { channelIdState } from '../atoms/channelAtom';
import ChatInput from './ChatInput';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Message from './Message';
import { organizationIdState } from '../atoms/organizationAtom';

function Chat() {
	const channelId = useRecoilValue(channelIdState);
	const organizationId = useRecoilValue(organizationIdState);
	const organizationRef = doc(db, 'organizations', organizationId);
	const channelsRef = doc(organizationRef, 'channels', channelId);
	const [channelName, setChannelName] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		console.time('Get Messages');
		const q = query(
			collection(channelsRef, 'messages'),
			orderBy('created', 'asc')
		);
		onSnapshot(q, (snapshot) => {
			setMessages(snapshot.docs);
		});
		onSnapshot(doc(organizationRef, 'channels', channelId), (doc) => {
			setChannelName(doc.data().name);
		});
		console.timeEnd('Get Messages');
	}, [channelId, organizationId]);

	return (
		<ChatContainer>
			<Header>
				<HeaderLeft>
					<h4>
						<strong>#{channelName}</strong>
						<StarBorderOutlined />
					</h4>
				</HeaderLeft>
				<HeaderRight>
					<p>
						<InfoOutlined />
						Details
					</p>
				</HeaderRight>
			</Header>
			<hr />

			<ChatMessages>
				{messages?.map((aMessage) => {
					const { id } = aMessage;
					const { message, created, user } = aMessage.data();
					return (
						<Message
							key={id}
							id={id}
							message={message}
							created={created}
							user={user}
						/>
					);
				})}
			</ChatMessages>

			<ChatInput channelName={channelName} channelId={channelId} />
		</ChatContainer>
	);
}

export default Chat;

const ChatMessages = styled.div`
	flex: 1;
	overflow: scroll;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0rem 1rem;
	background-color: var(--main-content);
	height: 50px;
	line-height: 1.33334;
	position: sticky;
	top: 0px;
	z-index: 1;
`;
const HeaderLeft = styled.div`
	display: flex;
	align-items: center;

	> h4 {
		font-size: 1.25rem;
		display: flex;
		text-transform: lowercase;
	}

	> h4 > .MuiSvgIcon-root {
		margin-left: 10px;
		font-size: 1rem;
	}
`;
const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	> p {
		display: flex;
		align-items: center;
		font-size: 0.8rem;
	}

	> p > .MuiSvgIcon-root {
		margin-right: 0.25rem;
		font-size: 1rem;
	}
`;

const ChatContainer = styled.div`
	flex-grow: 1;
	overflow-y: scroll;
	background-color: var(--main-content);
	> hr {
		border: 1px solid var(--border-color);
	}
`;
