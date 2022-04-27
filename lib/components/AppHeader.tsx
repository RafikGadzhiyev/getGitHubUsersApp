import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { motion } from "framer-motion";
import { Dispatch } from "react";
import ChangeTheme from "../../redux/actions/changeTheme";

const Header = styled(motion.header)`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const AppName = styled(motion.span)`
    font-weight: 700;
    letter-spacing: -1px;
`;
const ThemeModeContainer = styled(motion.div)`
`;
const ThemeSwitchButton = styled(motion.button)`
    all: unset;
    display: flex;
    height: 25px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    gap: 15px;
    transition: 300ms ease-in;

`;
const CurrentTheme = styled(motion.span)``;
const AllThemesContainer = styled(motion.div)`
    display: flex;
    gap: 30px;
    flex-direction: column;
    transition: 300ms ease-in;
    color: black;

    &.is_dark{
        transform: translateY(-53.5px);
        color: white;
    }

    `;
const Theme = styled(motion.span)``;
const CurrentThemeIcon = styled(motion.i)``;
const AllThemeIconsContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 30px;
    transition: 300ms ease-in;
    color: black;

    &.is_dark{
        transform: translateY(-53.5px);
        color: white;
    }

`;
const ThemeIcon = styled(motion.i)``;

export const AppHeader = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const store: any = useSelector(store => store);

    return (
        <Header>
            <AppName>
                GetGithubUserInfo
            </AppName>
            <ThemeModeContainer
                className={store.current_theme === 'light' ? '' : 'is_dark'}
            >
                <ThemeSwitchButton
                    onClick={() => dispatch(ChangeTheme(store.current_theme))}
                >
                    <CurrentTheme>
                        <AllThemesContainer
                            className={store.current_theme === 'light' ? '' : 'is_dark'}
                        >
                            <Theme>Light</Theme>
                            <Theme>Dark</Theme>
                        </AllThemesContainer>
                    </CurrentTheme>
                    <CurrentThemeIcon>
                        <AllThemeIconsContainer
                            className={store.current_theme === 'light' ? '' : 'is_dark'}
                        >
                            <ThemeIcon className="bi bi-sun" />
                            <ThemeIcon className="bi bi-moon" />
                        </AllThemeIconsContainer>
                    </CurrentThemeIcon>
                </ThemeSwitchButton>
            </ThemeModeContainer>
        </Header>
    )
}