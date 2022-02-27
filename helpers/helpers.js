import { organizationIdState } from '../atoms/organizationAtom';
import { channelIdState } from '../atoms/channelAtom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';

export const getCurrentOrg = () => {
	const orgID = useRecoilValue(organizationIdState);
	const orgRef = doc(db, 'organizations', orgID);
	return orgRef;
};

export const getCurrentOrgInfo = async () => {
	const orgRef = getCurrentOrg();
	const docSnap = await getDoc(orgRef);
	return docSnap;
};

export const getCurrentChannel = () => {
	const orgId = useRecoilValue(organizationIdState);
	const channelId = useRecoilValue(channelIdState);
	const orgRef = doc(db, 'organizations', orgId);
	const channelRef = doc(orgRef, 'channels', channelId);
	return channelRef;
};

export const sendMessage = () => {};
