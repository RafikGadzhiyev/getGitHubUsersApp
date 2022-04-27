import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled, { StyledComponentBase } from 'styled-components'
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import { PaginationData } from '../interfaces/PaginationData.interface';
import { ContainerThemeVariants, FormThemeVariants } from '../variants/theme.variant';
import { SetCurrentUser } from '../../redux/actions/SetCurrentUser';
import GetCurrentUserData from '../../redux/actions/GetCurrentUserData';

const ResultMainContainer: StyledComponentBase<ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>, any, {}, never> = styled(motion.div)`
    margin-top: 20px;
    padding: 20px;
    height: 750px;
    overflow-y: auto;
`;
const TotalUsersText: StyledComponentBase<ForwardRefComponent<HTMLSpanElement, HTMLMotionProps<"span">>, any, {}, never> = styled(motion.span)``;

const UsersList = styled(motion.ul)`
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
`

const User = styled(motion.li)`
    margin-block: 20px;
    width: inherit;
    transition: 300ms ease;
    border-radius: 5px;

    &:hover{
        background-color: rgba(219, 219, 210, 0.5);
    }

`
const UserImage = styled(motion.img)`
    border-radius: 50%;
    width:100px;
    height: 100px;
`

const UserButton = styled(motion.button)`
    all: unset;
    width: inherit;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: 20px;
    border-radius: 5px;
    padding: 10px 20px;
`

const CurrentUserInfoContainer = styled(motion.div)`
    display: flex;
    gap: 2rem;  
`;
const CurrentUserImageContainer = styled(motion.div)`
    width: 20%;
`;
const CurrentUserImage = styled.img`
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
`;
const CurrentUserInfo = styled(motion.div)`
    width: 80%;
`;
const CurrentUserNameInfo = styled(motion.div)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;    
`;
const CurrentUserName = styled.span`
    font-family: monospace;
    font-size: 2rem;
    letter-spacing: 5px;
`;
const CurrentUserJoinedTime = styled.span``;
const GitHubLink = styled(motion.a)`
    color: inherit;
    display: block;
    width: fit-content;
    color: blue;
`
const CurrentUserBioContainer = styled.div`
    margin-block: 1rem;
`;
const CurrentUserBio = styled.span``;
const CurrentUserBioNULL = styled.span`
    color:  gray;
`;
const CurrentUserRepoAndFollowersContainer = styled(motion.div)`
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    margin-block: 2rem;
    padding: 1rem 3rem;  
    border-radius: 5px;
`;
const CurrentUserRepoLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
`;
const CurrentUserLayoutTitle = styled.span`
    font-family: monospace;
    color: #bbb
`;
const CurrentUserLayoutContentByTitle = styled.span`
    font-size: 2rem;
`;
const CurrentUserExternalLinkLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem 0;
`;
const CurrentUserExternalLinkLayoutItem = styled.div`
    width: 50%;
    display: flex;
    gap: 1rem;
`
const CurrentUserExternalLinkLayoutIcon = styled.i``;
const CurrentUserExternalLinkLayoutInfo = styled.span``;
const CurrentUserExternalLinkLayoutInfoNULL = styled.span`color:gray`;

export const ResultContiner = () => {
    const store: any = useSelector(store => store);
    const dispatch: Dispatch<any> = useDispatch();
    const [paginationData, setPaginationData] = useState<PaginationData>({
        totalPages: 0,
        currentPage: 1
    });

    useEffect(() => {
        let total = Math.ceil(store.totalFoundUsersLength / 50);
        if (total) {
            setPaginationData(prev => ({ ...prev, totalPages: total }))
        }
    }, [store.totalFoundUsersLength])

    const getUserData = (login: string) => {
        dispatch(SetCurrentUser(login));
        dispatch(GetCurrentUserData(login));
    }

    const getDateString = (data: Date) => {
        const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = data.getMonth(),
            day = data.getDate(),
            year = data.getFullYear();

        return `
            ${day < 10 ? '0' + day : day} 
            ${MONTHS[month]}
            ${year < 10 ? '0' + year : year}
        `
    }

    return <ResultMainContainer
        initial='light'
        animate={store.current_theme}
        variants={FormThemeVariants}
    >
        {!!store.totalFoundUsersLength && !store.current_user &&
            <>
                <TotalUsersText>
                    Total users found: {store.totalFoundUsersLength}
                </TotalUsersText>
                <ul>
                    {
                        [paginationData.currentPage, paginationData.currentPage + 1, paginationData.currentPage + 2].map((e: any, i: number) => <li key={Math.random() * i}>{e}</li>)

                    }
                    <li>...</li>
                    <li>{paginationData.totalPages}</li>
                </ul>
                <UsersList>
                    {
                        store.totalFoundUsers.map((e: any, i: number) => <User key={Math.random() * (i + (100 << (i + 1)))}>
                            <UserButton
                                onClick={() => getUserData(e.login)}
                            >
                                <UserImage src={e.avatar_url} alt="Profile image" />
                                <span>{e.login}</span>
                            </UserButton>
                        </User>)
                    }
                </UsersList>
            </>
        }
        {
            !store.totalFoundUsersLength && !store.isLoading &&
            <>
                <TotalUsersText>
                    Nothing
                </TotalUsersText>
            </>
        }
        {store.isLoading &&
            <>
                <TotalUsersText>
                    Loading...
                </TotalUsersText>
            </>
        }
        {
            !store.isLoading && store.totalFoundUsersLength && store.current_user && store.current_user_data &&
            <CurrentUserInfoContainer>
                <CurrentUserImageContainer>
                    <CurrentUserImage src={store.current_user_data.avatar_url} alt="" />
                </CurrentUserImageContainer>
                <CurrentUserInfo>
                    <CurrentUserNameInfo>
                        <CurrentUserName>{store.current_user_data.name || store.current_user_data.login} </CurrentUserName>
                        <CurrentUserJoinedTime>Joined {getDateString(new Date(store.current_user_data.created_at))}</CurrentUserJoinedTime>
                    </CurrentUserNameInfo>
                    <GitHubLink
                        initial={"light"}
                        animate={store.current_theme}
                        variants={FormThemeVariants}
                        target='_blank'
                        rel='noreferrer'
                        href={store.current_user_data.html_url}
                    >
                        @{store.current_user_data.login}
                    </GitHubLink>
                    <CurrentUserBioContainer>
                        {
                            store.current_user_data.bio &&
                            <CurrentUserBio>
                                {store.current_user_data.bio}
                            </CurrentUserBio>
                        }
                        {
                            !store.current_user_data.bio &&
                            <CurrentUserBioNULL>
                                This profile  has no bio
                            </CurrentUserBioNULL>
                        }
                    </CurrentUserBioContainer>
                    <CurrentUserRepoAndFollowersContainer
                        initial={"light"}
                        animate={store.current_theme}
                        variants={ContainerThemeVariants}
                    >
                        <CurrentUserRepoLayout>
                            <CurrentUserLayoutTitle>Repos</CurrentUserLayoutTitle>
                            <CurrentUserLayoutContentByTitle>{store.current_user_data.public_repos}</CurrentUserLayoutContentByTitle>
                        </CurrentUserRepoLayout>
                        <CurrentUserRepoLayout>
                            <CurrentUserLayoutTitle>Followers</CurrentUserLayoutTitle>
                            <CurrentUserLayoutContentByTitle>{store.current_user_data.followers}</CurrentUserLayoutContentByTitle>
                        </CurrentUserRepoLayout>
                        <CurrentUserRepoLayout>
                            <CurrentUserLayoutTitle>Following</CurrentUserLayoutTitle>
                            <CurrentUserLayoutContentByTitle>{store.current_user_data.following}</CurrentUserLayoutContentByTitle>
                        </CurrentUserRepoLayout>
                    </CurrentUserRepoAndFollowersContainer>
                    <CurrentUserExternalLinkLayout>
                        <CurrentUserExternalLinkLayoutItem>
                            <CurrentUserExternalLinkLayoutIcon className='bi bi-geo-alt-fill'></CurrentUserExternalLinkLayoutIcon>
                            {
                                store.current_user_data.location &&
                                <CurrentUserExternalLinkLayoutInfo>{store.current_user_data.location}</CurrentUserExternalLinkLayoutInfo>
                            }
                            {
                                !store.current_user_data.location &&
                                <CurrentUserExternalLinkLayoutInfoNULL>Not available</CurrentUserExternalLinkLayoutInfoNULL>

                            }
                        </CurrentUserExternalLinkLayoutItem>
                        <CurrentUserExternalLinkLayoutItem>
                            <CurrentUserExternalLinkLayoutIcon className='bi bi-twitter'></CurrentUserExternalLinkLayoutIcon>
                            {
                                store.current_user_data.twitter_username &&
                                <CurrentUserExternalLinkLayoutInfo>{store.current_user_data.twitter_username}</CurrentUserExternalLinkLayoutInfo>
                            }
                            {
                                !store.current_user_data.twitter_username &&
                                <CurrentUserExternalLinkLayoutInfoNULL>Not available</CurrentUserExternalLinkLayoutInfoNULL>

                            }
                        </CurrentUserExternalLinkLayoutItem>
                        <CurrentUserExternalLinkLayoutItem>
                            <CurrentUserExternalLinkLayoutIcon className='bi bi-link-45deg'></CurrentUserExternalLinkLayoutIcon>
                            {
                                store.current_user_data.blog &&
                                <CurrentUserExternalLinkLayoutInfo>{store.current_user_data.blog}</CurrentUserExternalLinkLayoutInfo>
                            }
                            {
                                !store.current_user_data.blog &&
                                <CurrentUserExternalLinkLayoutInfoNULL>Not available</CurrentUserExternalLinkLayoutInfoNULL>

                            }
                        </CurrentUserExternalLinkLayoutItem>
                        <CurrentUserExternalLinkLayoutItem>
                            <CurrentUserExternalLinkLayoutIcon className='bi bi-building' ></CurrentUserExternalLinkLayoutIcon>
                            {
                                store.current_user_data.company &&
                                <CurrentUserExternalLinkLayoutInfo>{store.current_user_data.company}</CurrentUserExternalLinkLayoutInfo>
                            }
                            {
                                !store.current_user_data.company &&
                                <CurrentUserExternalLinkLayoutInfoNULL>Not available</CurrentUserExternalLinkLayoutInfoNULL>

                            }
                        </CurrentUserExternalLinkLayoutItem>

                    </CurrentUserExternalLinkLayout>
                </CurrentUserInfo>
            </CurrentUserInfoContainer>
        }
    </ResultMainContainer>

}