import { useState, useEffect, ComponentType } from 'react';
import { PaginationButton } from './PaginationButton';
import { PaginationElement } from './PaginationElement';
import styled, { StyledComponentBase } from 'styled-components';

type PaginationProps = {
    total: number,
    current: number,
    per_page: number,
    total_users: number
}

const PaginationContainer: StyledComponentBase<"div", any, {}, never> = styled.div`
    display: flex;
    padding-block: .5rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: inherit;
`

const PaginationData: StyledComponentBase<"span", any, {}, never> = styled.span`text-align:center;font-family: monospace`;
const PaginationList: StyledComponentBase<"ul", any, {}, never> = styled.ul`
    list-style: none;
    display: flex;
    gap: 1rem;
    align-itemc: center;
    justify-content: center;
`

export const Pagination = (props: PaginationProps) => {
    const idGenerator = require('shortid');
    const [totalPaginationItems, setTotalPaginationItems] = useState<Array<{ isCurrent: boolean, value: number, nonLink?: boolean }>>([]);

    useEffect(() => {
        const pagination: Array<{ isCurrent: boolean, value: number, nonLink?: boolean }> = [];

        if (props.current > 2) {
            pagination.push(
                {
                    isCurrent: false,
                    value: 1
                },
                {
                    isCurrent: false,
                    value: -1,
                    nonLink: true
                },
                {
                    isCurrent: false,
                    value: props.current - 1
                }
            )
        } else if (props.current === 2) {
            pagination.push(
                {
                    isCurrent: false,
                    value: props.current - 1
                }
            )
        }

        for (let i = props.current; i < props.current + 3 && (props.current + 2 < props.total); ++i) {
            pagination.push({
                isCurrent: i === props.current,
                value: i
            });
        }
        if (pagination.length) {
            if (pagination[pagination.length - 1].value !== props.total) {
                pagination.push(
                    {
                        isCurrent: false,
                        value: -1,
                        nonLink: true
                    },
                    {
                        isCurrent: false,
                        value: props.total
                    }
                )

            }
        }
        setTotalPaginationItems(() => pagination);

    }, [props.total, props.current])

    return (
        <PaginationContainer>
            <PaginationData>
                {(props.current - 1) * props.per_page}-{props.current * props.per_page < props.total_users ? props.current * props.per_page : props.total_users}
            </PaginationData>
            <PaginationList>

                {
                    totalPaginationItems.map((e, i: number) =>
                        e.isCurrent || e.nonLink ?
                            <PaginationElement
                                key={idGenerator.generate()}
                                value={e.value === -1 ? '...' : e.value}
                                isNonLink={e.nonLink || false}
                            /> :
                            <PaginationButton
                                key={idGenerator.generate()}
                                value={e.value}
                            />
                    )
                }

            </PaginationList>
        </PaginationContainer>
    )
}