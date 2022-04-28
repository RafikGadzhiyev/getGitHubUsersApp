import { useSelector } from 'react-redux'
import styled, { StyledComponentBase } from 'styled-components'
import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import { ListElementThemeVariants } from '../variants/theme.variant'

type PaginationElementProps = {
    value: number | string,
    isNonLink: boolean
}

const PaginationItem: StyledComponentBase<ForwardRefComponent<HTMLLIElement, HTMLMotionProps<"li">>, any, {}, never> = styled(motion.li)`
    border-radius: 5px;
    padding: .25rem .5rem;
`;

export const PaginationElement = (props: PaginationElementProps) => {
    const current_theme: string = useSelector((store: any) => store.current_theme);

    if (props.isNonLink) {
        return <PaginationItem>
            <span>
                {props.value}
            </span>
        </PaginationItem>
    }

    return (
        <PaginationItem
            initial={"light"}
            animate={current_theme}
            variants={ListElementThemeVariants}
        >
            <span>
                {props.value}
            </span>
        </PaginationItem>
    )
}