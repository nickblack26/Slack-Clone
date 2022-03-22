import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import Table from './Table';
import { getUserOrgs } from '../helpers/helpers';
import { useRouter } from 'next/router';
import AddOrg from './AddOrg';

const Workspaces = () => {
	const { data: session } = useSession();
	const [userOrgs, setUserOrgs] = useState([]);
	const router = useRouter();

	useEffect(() => {
		getUserOrgs(session).then((res) => setUserOrgs(res));
	}, []);

	return (
		<>
			{userOrgs == 0 ? (
				<AddOrg />
			) : (
				<WorkspaceWrap>
					<Header>
						<SlackImage src='/slack_logo.svg' />
					</Header>
					<PageContent>
						<PageHeading>
							Welcome back! You look nice today.
						</PageHeading>
						<PageSubheading>
							Choose a workspace below to get back to working with
							your team.
						</PageSubheading>
						<Table
							tableTitle={`${session?.user.email}`}
							tableItems={userOrgs}
						/>
						<WorkspaceBanner>
							<BannerTextWrap>
								<BannerImage src='/hi.svg' />
								Want to use with a different team?
							</BannerTextWrap>
							<BannerCTA href='/new/team'>
								Create Another Team
							</BannerCTA>
						</WorkspaceBanner>
					</PageContent>
				</WorkspaceWrap>
			)}
		</>
	);
};

export default Workspaces;

const WorkspaceWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	padding: 2rem 0rem;
	color: #4a154b;
	font-size: 15px;
`;

const Header = styled.header`
	padding-top: 48px;
	padding-bottom: 40px;
`;

const SlackImage = styled.img`
	height: 2rem;
`;

const PageContent = styled.div``;

const PageHeading = styled.h1`
	font-weight: 700;
	max-width: 700px;
	text-align: center;
	margin-bottom: 0;
	font-size: 32px;
	letter-spacing: -0.25px;
	line-height: 38px;
`;

const PageSubheading = styled.div`
	font-size: 15px;
	line-height: 22px;
	margin-bottom: 32px;
	color: #616061;
	max-width: 700px;
	text-align: center;
`;

const WorkspaceBanner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 40px;
	padding: 20px 24px 20px 16px;
	background-color: rgba(244, 237, 228, 0.5);
	border-radius: 12px;
`;

const BannerTextWrap = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;

const BannerImage = styled.img`
	width: 42px;
	margin-right: 8px;
`;

const BannerCTA = styled.a`
	text-decoration: none;
	border-radius: 4px;
	align-items: center;
	position: relative;
	display: inline-flex;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
	cursor: pointer;
	background-color: white;
	border: 1px solid #ddd;
	color: inherit;
	font-weight: 600;
	font-size: 15px;
	height: 36px;
	padding: 0px 12px;
`;
