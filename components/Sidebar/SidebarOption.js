import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { channelIdState } from '../../atoms/channelAtom';
import { organizationIdState } from '../../atoms/organizationAtom';
import Link from 'next/link';
import { addChannel } from '../../helpers/helpers';
import { useSession } from 'next-auth/react';

function SidebarOption({ Icon, title, addChannelOption, id }) {
	const orgId = useRecoilValue(organizationIdState);
	const [channelId, setChannelId] = useRecoilState(channelIdState);
	const { data: session } = useSession();

	const newChannel = () => {
		const channelName = prompt('Please enter the channel name');
		if (channelName) {
			const data = addChannel(orgId, channelName, session);
			data.then((res) => setChannelId(res));
		}
	};

	const selectChannel = () => {
		if (id) {
			setChannelId(id);
		}
	};

	return (
		<SidebarOptionContainer
			onClick={addChannelOption ? newChannel : selectChannel}
		>
			{Icon && <Icon />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<SidebarChannelLink href={`/client/${orgId}/${id}`}>
					<SidebarChannel>
						<span>#</span>
						{title}
					</SidebarChannel>
				</SidebarChannelLink>
			)}
		</SidebarOptionContainer>
	);
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
	display: flex;
	font-size: 0.8rem;
	align-items: center;
	cursor: pointer;
	opacity: 0.75;
	height: 2rem;
	padding: 0rem 1rem;
	color: var(--text-color);

	> .MuiSvgIcon-root {
		font-size: 0.9rem;
		padding: 0px !important;
		margin-right: 0.25rem;
	}

	:hover {
		opacity: 0.9;
		background-color: var(--hover-color);
	}

	> h3 > span {
		padding: 0rem 1rem;
		padding-right: 0.5rem;
	}
`;

const SidebarChannelLink = styled(Link)``;

const SidebarChannel = styled.h3`
	font-weight: 500;
	text-transform: lowercase;
`;
