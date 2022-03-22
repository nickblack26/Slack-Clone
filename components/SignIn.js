import React from 'react';
import { signIn } from 'next-auth/react';
import styled from 'styled-components';

const SignIn = ({ providers }) => {
	return (
		<SignInContainer>
			<SignInHeader>
				<LeftColumn></LeftColumn>
				<CenterColumn>
					<SlackImage src='./slack_logo.svg' />
				</CenterColumn>
				<RightColumn>
					<div>
						New to Slack?
						<br />
						<a>Create an account</a>
					</div>
				</RightColumn>
			</SignInHeader>
			<PageHeading>Sign in to Slack</PageHeading>
			<PageSubheading>
				We suggest using the email address you use at work.
			</PageSubheading>
			<LoginOptions>
				{Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<GoogleButton
							onClick={() =>
								signIn(provider.id, {
									callbackUrl: '/',
								})
							}
						>
							<img src='./google_button.svg' />
							Sign in with {provider.name}
						</GoogleButton>
					</div>
				))}
			</LoginOptions>
		</SignInContainer>
	);
};

export default SignIn;

const SignInContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100%;
	color: #1d1c1d;
`;

const LoginOptions = styled.div`
	width: 400px;
`;

const PageHeading = styled.h1`
	font-weight: 700;
	font-size: 48px;
	line-height: 46px;
	max-width: 700px;
	text-align: center;
	letter-spacing: -0.75px;
	margin-bottom: 10px;
`;

const PageSubheading = styled.div`
	font-size: 18px;
	line-height: 27px;
	margin-bottom: 32px;
	color: #454245;
	max-width: 700px;
	text-align: center;
`;

const SignInHeader = styled.header`
	padding: 48px 0 40px;
	width: 100%;
	display: grid;
	align-items: center;
	grid-template-columns: repeat(3, 1fr);
`;

const LeftColumn = styled.div``;

const CenterColumn = styled.div`
	text-align: center;
`;

const SlackImage = styled.img`
	height: 2rem;
`;

const RightColumn = styled.div`
	display: flex;
	justify-content: flex-end;

	> div {
		text-align: right;
		font-size: 13px;
		color: #616061;
		padding-right: 40px;
	}

	> div > a {
		color: #1264a3;
		text-decoration: none;
		font-weight: 700;
	}
`;

const GoogleButton = styled.button`
	font-size: 18px;
	font-weight: 900;
	height: 44px;
	min-width: 96px;
	display: flex;
	padding: 0;
	background-color: #fff;
	border: 2px solid #4285f4;
	color: #4285f4;
	width: 100%;
	max-width: 100%;
	user-select: none;
	outline: none;
	cursor: pointer;
	border-radius: 4px;
	align-items: center;
	position: relative;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
	-webkit-appearance: none;
	-webkit-tap-highlight-color: transparent;

	> img {
		margin-right: 12px;
		width: 18px;
		height: 18px;
	}
`;
