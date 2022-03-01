import { Button } from '@material-ui/core';
import { addDoc, doc, collection, serverTimestamp } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { organizationIdState } from '../atoms/organizationAtom';
import { db } from '../firebase';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

function ChatInput({ channelName, channelId }) {
	const organizationId = useRecoilValue(organizationIdState);

	const { data: session } = useSession();

	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const organizationRef = doc(db, 'organizations', organizationId);
		const channelsRef = doc(organizationRef, 'channels', channelId);
		resetField('message');
		if (!channelId) {
			return false;
		}

		await addDoc(collection(channelsRef, 'messages'), {
			message: data.message,
			created: serverTimestamp(),
			user: `${session?.token.email}`,
		});
	};

	return (
		<ChatInputContainer>
			<ChatInputContent>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							placeholder={`Send a message to #${channelName}`}
							{...register('message', { required: true })}
						/>

						{errors.exampleRequired && (
							<span>This field is required</span>
						)}

						<Button hidden type='submit'>
							SEND
						</Button>
					</form>
				</div>
			</ChatInputContent>
		</ChatInputContainer>
	);
}

export default ChatInput;

const ChatInputContainer = styled.div`
	position: relative;
	z-index: 200;
	margin-bottom: 75px;
`;

const ChatInputContent = styled.div`
	display: flex;
	padding: 0 1rem;
	flex: 1;

	> div {
		flex: 1;
	}

	> div > form {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		z-index: 1;
		border-radius: 0.5rem;
	}

	> div > form > input {
		width: 100%;
		border: 1px solid #4c4e4c;
		border-radius: 0.5rem;
		padding: 1rem;
		outline: none;
		background-color: #1f2124;
		color: white;
	}

	> div > form > button {
		display: none !important;
	}
`;
