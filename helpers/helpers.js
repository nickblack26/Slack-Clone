import { db } from '../firebase';
import {
	addDoc,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	documentId,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';

/* */
export const getCurrentOrg = (orgId) => {
	const currentOrgRef = doc(db, 'organizations', orgId);
	return currentOrgRef;
};

/* Function returns the contents of the current organization */
export const getCurrentOrgInfo = async (orgId) => {
	const currentOrgRef = doc(db, 'organizations', orgId);
	const data = await getDoc(currentOrgRef);
	return data;
};

export const getCurrentChannel = (orgId, channelId) => {
	const orgRef = doc(db, 'organizations', orgId);
	const channelRef = doc(orgRef, 'channels', channelId);
	return channelRef;
};

export const addNewOrg = async (orgName, session) => {
	const orgRef = collection(db, 'organizations');

	const org = await addDoc(orgRef, {
		name: orgName,
		created: serverTimestamp(),
		members: [`${session.user.email}`],
	});

	const currentOrg = doc(db, 'organizations', org.id);

	const userRef = doc(db, 'users', session.user.email);

	await updateDoc(userRef, {
		organizations: arrayUnion(`${org.id}`),
	});

	const orgChannels = collection(currentOrg, 'channels');

	await setDoc(doc(orgChannels, 'cyVesOzt1WunGIOSNO6Z'), {
		name: 'general',
		created: serverTimestamp(),
	});

	const generalChannel = doc(currentOrg, 'channels', 'cyVesOzt1WunGIOSNO6Z');

	await addDoc(collection(generalChannel, 'messages'), {
		message: `joined #general`,
		created: serverTimestamp(),
		user: `${session.user.email}`,
	});

	await setDoc(doc(orgChannels, '2gKgooHmLRD78MRf9b5e'), {
		name: 'random',
		created: serverTimestamp(),
	});

	const randomChannel = doc(currentOrg, 'channels', '2gKgooHmLRD78MRf9b5e');

	addDoc(collection(randomChannel, 'messages'), {
		message: `joined #random`,
		created: serverTimestamp(),
		user: `${session.user.email}`,
	});

	return org.id;
};

/* Make new channel in an organization */
export const addChannel = async (orgId, channelName, session) => {
	const orgRef = doc(db, 'organizations', orgId);
	const channelRef = await addDoc(collection(orgRef, 'channels'), {
		name: channelName,
		created: serverTimestamp(),
	});

	await addDoc(collection(channelRef, 'messages'), {
		created: serverTimestamp(),
		message: `joined #${channelName}`,
		user: `${session.user.email}`,
	});

	return channelRef.id;
};

export const sendMessage = async (orgId, channelId, message, session) => {
	const organizationRef = doc(db, 'organizations', orgId);
	const channelsRef = doc(organizationRef, 'channels', channelId);

	await addDoc(collection(channelsRef, 'messages'), {
		message: message,
		created: serverTimestamp(),
		user: `${session.user.email}`,
	});
};

export const deleteMessage = async (orgId, channelId, messageId) => {
	const orgRef = doc(db, 'organizations', orgId);
	const channelRef = doc(orgRef, 'channels', channelId);
	await deleteDoc(doc(channelRef, 'messages', messageId));
};

export const getUserOrgs = async (session) => {
	const orgsArray = [];
	const userRef = doc(db, 'users', session.user.email);
	const orgsRef = collection(db, 'organizations');
	const userData = await getDoc(userRef);
	console.log(userData.data());
	// if ('organizations' in userData.data()) {
	// 	let orgs = userData.data().organizations;
	// 	const q = query(orgsRef, where(documentId(), 'in', orgs));
	// 	const querySnapshot = await getDocs(q);

	// 	querySnapshot.forEach((org) => {
	// 		orgsArray.push(org);
	// 	});
	// 	return orgsArray;
	// }

	return orgsArray;
};

export const getOrgInfo = async (orgId) => {
	const orgRef = doc(db, 'organizations', orgId);
	const orgSnap = await getDoc(orgRef);
	return orgSnap.data();
};

export const getOrgChannels = async (orgId) => {
	let channels = [];
	const orgRef = doc(db, 'organizations', orgId);

	const channelRef = collection(orgRef, 'channels');

	onSnapshot(query(channelRef, orderBy('created', 'asc')), (channel) => {
		channels = channel.docs;
	});
	return channels;
};

export const getChannelMessages = async (orgId, channelId) => {
	const orgRef = doc(db, 'organizations', orgId);
	const channelRef = doc(orgRef, 'channels', channelId);
	const q = query(
		collection(channelRef, 'messages'),
		orderBy('created', 'asc')
	);

	onSnapshot(q, (snapshot) => {
		return snapshot.docs;
	});
};

export const getChannelName = async (orgId, channelId) => {
	const orgRef = doc(db, 'organizations', orgId);
	onSnapshot(doc(orgRef, 'channels', channelId), (doc) => {
		if (doc.exists()) {
			return doc.data().name;
		} else {
			return null;
		}
	});
};
