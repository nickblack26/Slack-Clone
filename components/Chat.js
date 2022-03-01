import { ExpandMore } from '@material-ui/icons';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import React, { useLayoutEffect, useState } from 'react';
import Message from './Message';

function Chat({ channelId, channelName, messages }) {
	const [height, setHeight] = useState(undefined);

	const calcHeight = () => {
		let header = document.getElementById('messages');
		let headerHeight = header.clientHeight;
		return headerHeight;
	};

	useLayoutEffect(() => {
		const calculatedHeight = calcHeight();
		console.log(calculatedHeight);
		setHeight(calculatedHeight);
	}, []);

	return (
		<ChatContainer>
			<ChatContent>
				<Header id='header'>
					<HeaderLeft>
						<HeaderText>
							<span>#{channelName}</span>
							<ExpandMore />
						</HeaderText>
					</HeaderLeft>
				</Header>
				<MessagePane>
					<div style={{ display: 'contents' }}>
						<MessagesWrap id='messages'>
							<MessagesPane>
								<div
									style={{
										overflow: 'hidden',
										height: `${height}`,
									}}
								>
									<div
										style={{
											overflowY: 'scroll',
											overflowX: 'hidden',
											height: '100%',
										}}
									>
										<div style={{ height: `${height}` }}>
											{messages?.map((aMessage) => {
												const { id } = aMessage;
												const {
													message,
													created,
													user,
												} = aMessage.data();
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
										</div>
									</div>
								</div>
							</MessagesPane>
						</MessagesWrap>
						<div id='input'>
							<ChatInput
								channelName={channelName}
								channelId={channelId}
							/>
						</div>
					</div>
				</MessagePane>
			</ChatContent>
		</ChatContainer>
	);
}

export default Chat;

const ChatContainer = styled.main`
	display: flex;
	grid-template-rows: auto;
	flex-direction: column;
	flex: 1;
	position: relative;
	min-height: 0;
	min-width: 0;
	display: grid;
	grid-template-columns: auto;
	background-color: var(--main-content);
`;

const MessagesPane = styled.div`
	width: 100%;
	position: absolute;
	overflow: hidden;
	height: auto;
	top: -8px;
	bottom: 0;
	padding-left: 0;
`;

const ChatContent = styled.div`
	flex: 1;
	min-height: 0;
	position: relative;
	overflow: scroll;
	display: flex;
	flex-direction: column;
`;

const MessagePane = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	position: relative;
	min-height: 0;
`;

const Header = styled.header`
	height: 49px;
	display: flex;
	align-items: center;
	padding: 0 1rem;
	flex-shrink: 0;
	background: var(--main-content);
	z-index: 202;
	border-bottom: 1px solid #e2e2e2;
`;

const HeaderLeft = styled.div`
	display: flex;
	flex: 1 1 0;
	min-width: 0;
	align-items: baseline;
`;

const HeaderText = styled.div`
	font-size: 1.125rem;
	font-weight: 900;

	.MuiSvgIcon-root {
		height: 1.125rem;
		width: 1.125rem;
	}
`;

const MessagesWrap = styled.div`
	flex: 1;
	min-height: 0;
	position: relative;
`;
