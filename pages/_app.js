import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme, GlobalStyles } from '../styles/Themes';

export default function App({ Component, pageProps }) {
	const [theme, setTheme] = useState('light');
	useEffect(() => {
		const darkThemePreference = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;
		darkThemePreference ? setTheme('dark') : setTheme('light');
	}, []);

	return (
		<>
			<SessionProvider session={pageProps.session}>
				<RecoilRoot>
					<ThemeProvider
						theme={theme === 'light' ? lightTheme : darkTheme}
					>
						<GlobalStyles />
						<Header />
						<Component {...pageProps} />
					</ThemeProvider>
				</RecoilRoot>
			</SessionProvider>
		</>
	);
}
