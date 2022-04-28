import React, { Dispatch } from 'react';
import { FormThemeVariants, IconThemeVariants } from '../variants/theme.variant';
import { useDispatch, useSelector } from 'react-redux'
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import styled, { StyledComponentBase } from 'styled-components'
import { SearchUsers, setQuery } from '../../redux/actions/searchUsers';
import { ResetUsersData } from '../../redux/actions/resetUsersData';

const FormContainer: StyledComponentBase<ForwardRefComponent<HTMLFormElement, HTMLMotionProps<"form">>, any, {}, never> = styled(motion.form)`
    width: 100%;
    padding: 0 10px 0 25px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
`;
const FormIcon: StyledComponentBase<ForwardRefComponent<HTMLElement, HTMLMotionProps<'i'>>, any, {}, never> = styled(motion.i)`
    color: #173871;
`;
const FormInput: StyledComponentBase<ForwardRefComponent<HTMLInputElement, HTMLMotionProps<"input">>, any, {}, never> = styled(motion.input)`
    all: unset;
    width: 100%;
    padding-block: 20px;
`;
const FormButton: StyledComponentBase<ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>, any, {}, never> = styled(motion.button)`
    all: unset;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #107AFE;
    transition: 300ms ease;
    color: white;
    
    &.is_dark{
        background-color: #1074F4;
    }

    &:hover{
        background-color: #0060d7;
    }

`;



export const SearchForm = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const store: any = useSelector(store => store);

    const searchUser = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let searchInput: HTMLInputElement | null = document.querySelector('.search_input');
        if (searchInput && searchInput.value) {
            dispatch(ResetUsersData())
            dispatch(setQuery(searchInput.value))
            dispatch(SearchUsers(searchInput.value, 1))
        }
    }

    return <FormContainer
        initial={'initial'}
        animate={store.current_theme}
        variants={FormThemeVariants}
    >
        <FormIcon
            initial={'light'}
            animate={store.current_theme}
            variants={IconThemeVariants}
            className='bi bi-search'
        />
        <FormInput
            placeholder='Search by github username'
            className='search_input'
        />
        <FormButton
            className={store.current_theme === 'light' ? '' : 'is_dark'}
            onClick={(e: React.SyntheticEvent) => searchUser(e)}
        >Search</FormButton>
    </FormContainer>

}