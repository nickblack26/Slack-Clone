import React from 'react';
import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import {
	ExpandMore,
	InsertCommentRounded,
	AddCircleRounded,
	QuestionAnswerRounded,
	NotesRounded,
	LayersRounded,
	BookmarkBorderRounded,
	MoreVertRounded,
	CellWifiRounded,
} from '@material-ui/icons/';
import SidebarOption from './SidebarOption';

function Sidebar({ orgName, channels }) {
	return (
		<SidebarWrap>
			<SidebarContainer>
				<SidebarTeamHeader>
					<SidebarHeaderButtonWrap>
						<SidebarHeaderInfo>
							<SidebarHeaderButton>
								<span>{orgName}</span>
							</SidebarHeaderButton>
						</SidebarHeaderInfo>
					</SidebarHeaderButtonWrap>
					<SidebarComposeButton>
						<CreateIcon />
					</SidebarComposeButton>
				</SidebarTeamHeader>
				<SidebarNavigation>
					<SidebarList>
						<SidebarOption
							Icon={InsertCommentRounded}
							title='Threads'
						/>
						<SidebarOption
							Icon={NotesRounded}
							title='All unreads'
						/>
						<SidebarOption
							Icon={QuestionAnswerRounded}
							title='All DMs'
						/>
						<SidebarOption
							Icon={BookmarkBorderRounded}
							title='Saved items'
						/>
						<SidebarOption
							Icon={LayersRounded}
							title='File browser'
						/>
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
					</SidebarList>
				</SidebarNavigation>
				<SidebarToolbar>
					<CellWifiRounded />
				</SidebarToolbar>
			</SidebarContainer>
		</SidebarWrap>
	);
}

export default Sidebar;

const SidebarWrap = styled.div`
	overflow: hidden;
`;

const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 0;
	min-width: 0;
	height: 100%;

	> .MuiSvgIcon-root {
		padding: 8px;
		color: #49274b;
		font-size: 18px;
		background-color: white;
		border-radius: 999px;
	}
`;

const SidebarTeamHeader = styled.div`
	height: 50px;
	font-size: 1.125rem;
	border-bottom: 1px solid var(--border-color);
	position: relative;
	display: flex;
	align-items: stretch;
	background-color: var(--slack-color);
	color: var(--text-color);

	.MuiSvgIcon-root {
		flex: 0.3;
		font-size: 0.75rem;
		background-color: white;
		color: black;
		padding: 0.25rem;
		border-radius: 50%;
		align-self: center;
	}
`;

const SidebarNavigation = styled.div`
	height: 100%;
	min-height: 0;
	width: 100%;
	font-size: 0.9rem;
	flex: 1;
	position: relative;
	padding: 0;
	display: flex;
	flex-direction: column;
	background-color: var(--slack-color);
`;

const SidebarList = styled.div`
	flex: 1;
	position: relative;
	display: block;
	height: 100%;
	padding-top: 0.5rem;
`;

const SidebarToolbar = styled.div``;

const SidebarHeaderButtonWrap = styled.div`
	flex: 1;
	min-width: 0;
	display: flex;
	align-items: center;
	padding-left: 1rem;
	padding-right: 3rem;
	background-clip: padding-box;
	position: relative;
	z-index: 1;
	flex-direction: row-reverse;
`;

const SidebarHeaderInfo = styled.div`
	flex: 1;
	min-width: 0;
	order: 1;
`;

const SidebarHeaderButton = styled.button`
	display: flex;
	align-items: center;
	max-width: 100%;
	padding-left: 4px;
	margin-left: -4px;
	background: none;
	border: 0;
	color: inherit;
	font: inherit;
	margin: 0;
	line-height: inherit;
	overflow: initial;
	padding: 0;
	text-align: initial;
	vertical-align: initial;
	cursor: pointer;

	> span {
		min-width: 0;
		font-weight: 900;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		display: block;
	}
`;

const SidebarComposeButton = styled.button`
	border: 0;
	font: inherit;
	margin: 0;
	line-height: inherit;
	overflow: initial;
	padding: 0;
	text-align: initial;
	vertical-align: initial;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 16px;
	bottom: 24px;
	z-index: 3;
	height: 34px;
	width: 34px;
	top: 8px;
	background: #d1d2d3;
	border-radius: 1rem;

	> svg {
		background-color: transparent !important;
		padding: 0 !important;
		flex: 1 !important;
		color: black !important;
		font-size: 1rem !important;
	}
`;
