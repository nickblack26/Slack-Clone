import React from 'react';
import styled from 'styled-components';
import { signIn } from 'next-auth/react';

const Login = () => {
	return (
		<AppBody>
			<button onClick={signIn}>Sign In</button>
		</AppBody>
	);
};

export default Login;

const AppBody = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100%;
`;
