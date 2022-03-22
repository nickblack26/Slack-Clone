import React from 'react';
import styled from 'styled-components';
import Form from './AddOrg/Form';

function AddOrg() {
	return (
		<NewOrgWrap>
			<BlankNav />
			<NewOrgContent>
				<NewOrgInfo></NewOrgInfo>
				<NewOrg>
					<OrgStep>Step 1 of 3</OrgStep>
					<OrgSetupTitle>
						What’s the name of your company or team?
					</OrgSetupTitle>
					<OrgSetupSubtitle>
						This will be the name of your Slack workspace — choose
						something that your team will recognize.
					</OrgSetupSubtitle>
					<Form org />
				</NewOrg>
			</NewOrgContent>
			)
		</NewOrgWrap>
	);
}

export default AddOrg;

const NewOrgWrap = styled.div`
	display: grid;
	grid-template-rows: 44px auto min-content;
	width: 100vw;
	height: 100vh;
	background-color: #1a1d21;
`;

const BlankNav = styled.div`
	background: #121016;
	box-shadow: 0 1px 0 0 rgb(209 210 211 / 10%);
`;

const NewOrgContent = styled.div`
	display: grid;
	grid-template-rows: auto;
	overflow: hidden;
	position: relative;
	grid-template-columns: 260px auto;
`;

const NewOrgInfo = styled.div`
	background-color: #18171b;
`;

const NewOrg = styled.div`
	background-color: #191b1e;
	padding: 2.5rem 5rem 5rem 5rem;
	height: 100%;
	max-width: 820px;
`;

const OrgStep = styled.p`
	margin-bottom: 24px;
	font-size: 13px;
	line-height: 1.25;
	font-weight: 400;
`;

const OrgSetupTitle = styled.h2`
	margin-bottom: 8px;
	font-size: 50px;
	line-height: 1.25;
	font-weight: 700;
`;

const OrgSetupSubtitle = styled.p`
	margin-bottom: 24px;
`;
