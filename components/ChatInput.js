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
	const organizationRef = doc(db, 'organizations', organizationId);
	const channelsRef = doc(organizationRef, 'channels', channelId);
	const { data: session } = useSession();

	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					placeholder={`Send a message to #${channelName}`}
					{...register('message', { required: true })}
				/>

				{errors.exampleRequired && <span>This field is required</span>}

				<Button hidden type='submit'>
					SEND
				</Button>
			</form>
		</ChatInputContainer>
	);
}

export default ChatInput;

const ChatInputContainer = styled.div`
	> form {
		position: relative;
		display: flex;
		justify-content: center;
		z-index: 1;
		background-color: var(--main-content);
	}

	> form > input {
		position: fixed;
		bottom: 2rem;
		width: 60%;
		border: 1px solid #4c4e4c;
		border-radius: 0.5rem;
		padding: 1rem;
		outline: none;
		background-color: #1f2124;
		color: white;
	}
	> form > textarea {
		position: fixed;
		bottom: 2rem;
		width: 75%;
		border-radius: 0.5rem;
		padding: 1rem;
		outline: none;
	}

	> form > button {
		display: none !important;
	}
`;
