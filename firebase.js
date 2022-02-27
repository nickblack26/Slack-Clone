import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBZee_qjHJgQRhLXNwBS965KsYkMgXltJk',
	authDomain: 'slack-clone-1b172.firebaseapp.com',
	projectId: 'slack-clone-1b172',
	storageBucket: 'slack-clone-1b172.appspot.com',
	messagingSenderId: '10550571345',
	appId: '1:10550571345:web:09f53fca075a981ff8a370',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
