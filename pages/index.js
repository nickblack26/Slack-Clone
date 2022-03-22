import { getProviders, getSession, useSession } from 'next-auth/react';
import Workspaces from '../components/Workspaces';
import SignIn from '../components/SignIn';

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const providers = await getProviders();
	return {
		props: {
			session,
			providers,
		},
	};
}

export default function Home({ providers }) {
	const { status } = useSession();

	return (
		<>
			{status === 'unauthenticated' ? (
				<SignIn providers={providers} />
			) : (
				<Workspaces />
			)}
		</>
	);
}
