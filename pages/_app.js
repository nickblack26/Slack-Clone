import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme, GlobalStyles } from '../styles/Themes';

function App({ Component, pageProps: { session, ...pageProps } }) {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const darkThemePreference = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;
		darkThemePreference ? setTheme('dark') : setTheme('light');
	}, []);

	return (
		<>
			<SessionProvider session={session}>
				<RecoilRoot>
					<ThemeProvider
						theme={theme === 'light' ? lightTheme : darkTheme}
					>
						<GlobalStyles />
						<Component {...pageProps} />
					</ThemeProvider>
				</RecoilRoot>
			</SessionProvider>
		</>
	);
}

export default App;
