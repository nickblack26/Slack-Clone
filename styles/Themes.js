import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
	body: '#fafafa',
	sideBarColor: '#3F0E40',
	sideBarTextColor: '#fff',
	text: '#000',
	hoverColor: '#350D36',
	borderColor: '#522653',
	borderColorRgb: '82,38,83',
	selectionColor: '#145996',
	background: '#363537',
};
export const darkTheme = {
	body: '#191b1e',
	sideBarColor: '#18171b',
	sideBarTextColor: 'white',
	text: '#FAFAFA',
	hoverColor: '#1f2124',
	borderColor: '#262529',
	borderColorRgb: '38, 37, 41',
	selectionColor: '#145996',
	background: '#999',
};

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		box-sizing: border-box;
	}

	body {
		--slack-color: ${({ theme }) => theme.sideBarColor};
		--border-color: ${({ theme }) => theme.borderColor};
		--border-color-rgb: ${({ theme }) => theme.borderColorRgb};
		--main-content: ${({ theme }) => theme.body};
		--selected-color: ${({ theme }) => theme.selectionColor};
		--hover-color: ${({ theme }) => theme.hoverColor};
		color: ${({ theme }) => theme.text};
		overflow: hidden;
		margin: 0;
		font-size: 16px;
		font-family: 'Helvetica';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	p {
		line-height: 1.25;
	}
`;
