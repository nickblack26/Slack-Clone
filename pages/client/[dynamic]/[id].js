import React, { useEffect, useState } from 'react';
import Chat from '../../../components/Chat';
import Sidebar from '../../../components/Sidebar/Sidebar';
import styled from 'styled-components';
import Head from 'next/head';
import Header from '../../../components/Header';
import { useRecoilState } from 'recoil';
import { organizationIdState } from '../../../atoms/organizationAtom';
import { channelIdState } from '../../../atoms/channelAtom';
import { useRouter } from 'next/router';

import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
	const session = getSession(context);
	const data = JSON.parse(JSON.stringify(session));

	return {
		props: { data },
	};
}

const Org = ({ data }) => {
	console.log(data);
	const router = useRouter();
	const [orgInfo, setOrgInfo] = useState({});
	const [orgId, setOrgId] = useRecoilState(organizationIdState);
	const [channelId, setChannelId] = useRecoilState(channelIdState);
	const [orgChannels, setOrgChannels] = useState([]);
	const [orgChannelMessages, setOrgChannelMessages] = useState([]);
	const [channelName, setChannelName] = useState('');
	const { dynamic, id } = router.query;

	const getOrgInfo = async () => {
		const orgRef = doc(db, 'organizations', dynamic);
		const orgSnap = await getDoc(orgRef);
		setOrgInfo(orgSnap.data());
	};

	const getOrgChannels = async () => {
		const orgRef = doc(db, 'organizations', dynamic);
		const channelRef = collection(orgRef, 'channels');
		onSnapshot(query(channelRef, orderBy('created', 'asc')), (channel) => {
			setOrgChannels(channel.docs);
		});
	};

	const getChannelMessages = async () => {
		const orgRef = doc(db, 'organizations', dynamic);
		const channelRef = doc(orgRef, 'channels', channelId);
		const q = query(
			collection(channelRef, 'messages'),
			orderBy('created', 'asc')
		);

		onSnapshot(q, (snapshot) => {
			setOrgChannelMessages(snapshot.docs);
		});
	};

	const getChannelName = async () => {
		const orgRef = doc(db, 'organizations', dynamic);
		onSnapshot(doc(orgRef, 'channels', channelId), (doc) => {
			if (doc.exists()) {
				setChannelName(doc.data().name);
			}
		});
	};

	useEffect(() => {
		if (!router.isReady) return;
		setOrgId(dynamic);
		setChannelId(id);
		getOrgInfo().catch((err) => console.error(err));
		getOrgChannels().catch((err) => console.error(err));
		getChannelName().catch((err) => console.error(err));
		getChannelMessages().catch((err) => console.error(err));
	}, [router.isReady]);

	useEffect(() => {
		getChannelName(orgId, channelId).catch((err) => console.error(err));
		getChannelMessages(orgId, channelId).catch((err) => console.error(err));
	}, [channelId]);

	return (
		<>
			<Header />
			<AppBody>
				<Head>
					<title>
						Slack | {channelName} | {orgInfo?.name}
					</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<Sidebar orgName={orgInfo?.name} channels={orgChannels} />
				<Chat
					channelId={channelId}
					channelName={channelName}
					messages={orgChannelMessages}
				/>
			</AppBody>
		</>
	);
};

export default Org;

const AppBody = styled.div`
	display: grid;
	grid-template-rows: auto;
	overflow: hidden;
	position: relative;
	grid-template-columns: 260px auto;
	height: 100vh;
`;
