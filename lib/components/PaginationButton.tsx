import { useSelector, useDispatch } from 'react-redux'
import { ForwardRefComponent, HTMLMotionProps, motion, Variant } from 'framer-motion'
import styled, { StyledComponentBase } from 'styled-components'
import { ListButtonThemeVariants } from '../variants/theme.variant'
import { Dispatch } from 'react'
import { SearchUsers } from '../../redux/actions/searchUsers'

type PaginationButton = {
    value: number,
}

const PaginationElement: StyledComponentBase<ForwardRefComponent<HTMLLIElement, HTMLMotionProps<'li'>>, any, {}, never> = styled(motion.li)`
    border: 2px solid;
    border-radius: 5px;
`;

const PaginationElementButton: StyledComponentBase<"button", any, { hover_background_color: string, hover_color: string }, never> = styled.button`
    all: unset;
    cursor: pointer;
    width: inherit;
    height: inherit;
    padding: .25rem .5rem;

    &:hover{
        background-color: ${(props: { hover_color: string, hover_background_color: string }) => props.hover_background_color};
        color: ${(props: { hover_color: string, hover_background_color: string }) => props.hover_color}
    }

`

export const PaginationButton = (props: PaginationButton) => {
    const current_theme: string = useSelector((store: any) => store.current_theme);
    const query: string = useSelector((store: any) => store.query);
    const dispatch: Dispatch<any> = useDispatch();

    return (
        <PaginationElement
            initial={"light"}
            animate={current_theme}
            variants={ListButtonThemeVariants}
        >
            <PaginationElementButton
                hover_color={current_theme === 'light' ? '#fff' : '#fff'}
                hover_background_color={current_theme === 'light' ? '#107AFE' : '#1074F4'}
                onClick={() => dispatch(SearchUsers(query, props.value))}
            >
                {props.value}
            </PaginationElementButton>
        </PaginationElement>
    )

}