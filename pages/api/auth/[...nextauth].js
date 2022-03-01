import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

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
	secret: 'PLACE-HERE-ANY-STRING',
	callbacks: {
		session: async (session) => {
			await setDoc(doc(db, 'users', `${session.session.user.email}`), {
				name: `${session.session.user.name}`,
				email: `${session.session.user.email}`,
				image: `${session.session.user.image}`,
			});
			return Promise.resolve(session);
		},
	},
});
