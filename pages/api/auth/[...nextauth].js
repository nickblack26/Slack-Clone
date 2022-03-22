import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const userExistence = async ({ session }) => {
	const userRef = doc(db, 'users', `${session.user.email}`);
	const userData = await getDoc(userRef);
	return userData;
};

const createNewUser = async ({ session }) => {
	await setDoc(doc(db, 'users', `${session.session.user.email}`), {
		name: `${session.user.name}`,
		email: `${session.user.email}`,
		image: `${session.user.image}`,
	});
};

export default NextAuth({
	// Configure one or more authentication providers
	session: {
		jwt: true,
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: '/signin',
	},
	callbacks: {
		session: async (session) => {
			// check to see if user already exists
			const user = userExistence(session);
			console.log(session);

			user.then((res) => {
				if (!res.exists()) {
					createNewUser(session);
				}
			}).catch((err) => console.log(err));

			return Promise.resolve(session);
		},
		async session({ session }) {
			/* This is the part that the user can see */

			return session;
		},
	},
});
