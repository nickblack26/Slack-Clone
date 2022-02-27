import Head from 'next/head';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../components/Chat';
import { useSession } from 'next-auth/react';
import Login from './login';

export default function Home() {
	const { data: session } = useSession();

	return (
		<AppBody>
			<Head>
				<title>Slack</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{session ? (
				<>
					<Sidebar />
					<Chat />
				</>
			) : (
				<>
					<Login />
				</>
			)}
		</AppBody>
	);
}

const AppBody = styled.div`
	display: flex;
	height: 100vh;
`;
