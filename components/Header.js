import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

function Header() {
	const { data: session } = useSession();

	return (
		<HeaderContainer>
			<HeaderLeft>
				<AccessTimeIcon />
			</HeaderLeft>
			<HeaderSearchContainer>
				<HeaderSearchButton>
					<span>Search Slack</span>
					<SearchIcon />
				</HeaderSearchButton>
			</HeaderSearchContainer>
			<HeaderRight>
				<HelpOutlineIcon />
				{/* {session ? (
					<a onClick={signOut}>
						<ImageAvatar
							src={`${session?.token?.picture}`}
							height={28}
							width={28}
						/>
					</a>
				) : (
					<a onClick={signIn}>
						<HeaderAvatar />
					</a>
				)} */}
			</HeaderRight>
		</HeaderContainer>
	);
}

export default Header;

const HeaderContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 10px 0;
	background-color: var(--slack-color);
	color: white;
`;

const HeaderLeft = styled.div`
	display: flex;
	justify-content: flex-end;
	flex: 1;
	flex-grow: 0;
	align-items: center;
	padding-left: 1rem;
	padding-right: 1.25rem;
	min-width: 260px;

	/* target all icons inside of header left*/
	> .MuiSvgIcon-root {
		margin-left: auto;
	}

	> a {
		cursor: pointer;
	}
`;

const HeaderRight = styled.div`
	flex: 1;
	min-width: 128px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 16px;
	padding-left: 32px;
	position: relative;
	min-width: 260px;

	/* target all icons inside of header left*/
	> .MuiSvgIcon-root {
		margin-left: auto;
		margin-right: 0.75rem;
	}
`;

const ImageAvatar = styled(Image)`
	border-radius: 0.25rem;
`;

const HeaderAvatar = styled(Avatar)`
	cursor: pointer;

	:hover {
		opacity: 0.8;
	}
`;

const HeaderSearchButton = styled.button`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;
	flex: 5;
	font-size: 0.8rem;
	min-width: 0;
	max-width: 732px;
	padding: 0.25rem 0.5rem;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 0.2);
	border: none;
	color: inherit;

	> .MuiSvgIcon-root {
		height: 1rem;
	}

	> span {
		padding-left: 0.5rem;
	}
`;

const HeaderSearchContainer = styled.div`
	flex: 2;
	display: flex;
	max-width: 732px;
`;
