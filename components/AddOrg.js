import React from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import {
	collection,
	addDoc,
	serverTimestamp,
	doc,
	setDoc,
} from 'firebase/firestore';
import AddIcon from '@material-ui/icons/Add';

function AddOrg() {
	const addOrg = async () => {
		const orgName = prompt('Please enter the organization name');
		if (orgName) {
			const org = await addDoc(collection(db, 'organizations'), {
				name: orgName,
				created: serverTimestamp(),
			});

			const orgRef = doc(db, 'organizations', org.id);

			const channelRef = collection(orgRef, 'channels');

			await setDoc(doc(channelRef, 'cyVesOzt1WunGIOSNO6Z'), {
				name: 'general',
				created: serverTimestamp(),
			});

			const genRef = doc(orgRef, 'channels', 'cyVesOzt1WunGIOSNO6Z');

			await addDoc(collection(genRef, 'messages'), {
				message: `joined #general`,
				created: serverTimestamp(),
				user: '3YbWvDEo9a3UeJy9Wx1o',
			});

			await setDoc(doc(channelRef, '2gKgooHmLRD78MRf9b5e'), {
				name: 'random',
				created: serverTimestamp(),
			});

			const randRef = doc(orgRef, 'channels', '2gKgooHmLRD78MRf9b5e');

			addDoc(collection(randRef, 'messages'), {
				message: `joined #random`,
				created: serverTimestamp(),
				user: '3YbWvDEo9a3UeJy9Wx1o',
			});
		}
	};

	return (
		<AddOrgContainer onClick={addOrg}>
			<AddIcon />
		</AddOrgContainer>
	);
}

export default AddOrg;

const AddOrgContainer = styled.div`
	.MuiSvgIcon-root {
		margin-top: 1rem;
		font-size: 1.5rem;
		color: white;
		cursor: pointer;
	}
`;
