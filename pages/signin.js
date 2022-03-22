import { getProviders } from 'next-auth/react';
import React from 'react';
import SignIn from '../components/SignIn';

// server side render
export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

const Signin = ({ providers }) => {
	return (
		<>
			<SignIn providers={providers} />
		</>
	);
};

export default Signin;
