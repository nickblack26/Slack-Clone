import styled from 'styled-components';
import { db } from '../../firebase';
import { collection, addDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { channelIdState } from '../../atoms/channelAtom';
import { organizationIdState } from '../../atoms/organizationAtom';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function SidebarOption({ Icon, title, addChannelOption, id }) {
	const [channelId, setChannelId] = useRecoilState(channelIdState);
	const orgId = useRecoilValue(organizationIdState);
	const { data: session } = useSession();

	const addChannel = async () => {
		const channelName = prompt('Please enter the channel name');

		if (channelName) {
			const orgRef = doc(db, 'organizations', orgId);
			const channelRef = await addDoc(collection(orgRef, 'channels'), {
				name: channelName,
				created: serverTimestamp(),
			});

			await addDoc(collection(channelRef, 'messages'), {
				created: serverTimestamp(),
				message: `joined #${channelName}`,
				user: `${session.token.email}`,
			});

			setChannelId(channelRef.id);
		}
	};

	const selectChannel = () => {
		if (id) {
			setChannelId(id);
		}
	};

	return (
		<SidebarOptionContainer
			onClick={addChannelOption ? addChannel : selectChannel}
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
