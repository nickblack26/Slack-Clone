import React from 'react';
import styled from 'styled-components';
import SidebarTeams from './SidebarTeams';
import SidebarInfo from './SidebarInfo';

function Sidebar() {
	return (
		<SidebarWrap>
			<SidebarContent>
				<SidebarTeams />
				<SidebarInfo />
			</SidebarContent>
		</SidebarWrap>
	);
}

export default Sidebar;

const SidebarWrap = styled.div`
	background-color: var(--slack-color);
	color: white;
	border-top: 1px solid var(--border-color);
	max-width: 260px;
`;

const SidebarContent = styled.div`
	display: flex;
	height: 100%;
`;
