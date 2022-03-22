import React, { useState } from 'react';
import styled from 'styled-components';
import { organizationIdState } from '../../atoms/organizationAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AddChannel, addNewOrg } from '../../helpers/helpers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Form = ({ org, channel }) => {
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();
	const [ordId, setOrgId] = useRecoilState(organizationIdState);
	const router = useRouter();

	const addOrg = async (e) => {
		e.preventDefault();
		const { value } = e.target.elements.org;
		setLoading(true);

		const org = addNewOrg(value, session);
		org.then((res) => setOrgId(res))
			.then((res) => {
				router.push(`client/${ordId}/cyVesOzt1WunGIOSNO6Z`);
			})
			.catch((err) => console.error(err));
	};

	const newChannel = async (e) => {
		e.preventDefault();
		const { value } = e.target.elements.channel;
		const channel = AddChannel(ordId, value, session);
		channel.then((res) => console.log(res));
	};

	return (
		<form onSubmit={org ? addOrg : newChannel}>
			{org && (
				<FormInput
					type='text'
					placeholder='Ex: Acme Corp or Acme Co'
					name='org'
					// {...register('orgName', {
					// 	required: true,
					// 	maxLength: 50,
					// })}
				/>
			)}
			{channel && (
				<FormInput
					type='text'
					placeholder='Ex: Q4 budget, autumn campaign'
					name='channel'
					// {...register('firstChannel', {
					// 	required: true,
					// 	maxLength: 50,
					// })}
				/>
			)}
			<input type='submit' hidden />
			<FormButton>Next</FormButton>
		</form>
	);
};

export default Form;

const FormInput = styled.input`
	background-color: transparent;
	border: 1px solid #474a4d;
	transition: border 80ms ease-out, box-shadow 80ms ease-out;
	box-sizing: border-box;
	margin: 0 0 20px;
	width: 100%;
	color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
	padding: 12px;
	height: 44px;
	padding-top: 11px;
	padding-bottom: 13px;
	font-size: 18px;
	line-height: 1.33333333;
	padding-right: 46px;
	border-radius: 4px;
	color: #9b9b9d;

	::placeholder {
		color: #9b9b9d;
	}
`;

const FormButton = styled.button`
	user-select: none;
	outline: none;
	cursor: pointer;
	border: none;
	border-radius: 4px;
	align-items: center;
	position: relative;
	display: inline-flex;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
	text-decoration: none;
	-webkit-appearance: none;
	font-size: 18px;
	font-weight: 900;
	height: 44px;
	padding: 0 16px 3px;
	min-width: 200px;
	transition: none !important;
`;
