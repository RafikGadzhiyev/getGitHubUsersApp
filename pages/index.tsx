import { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next'
import { AppHeader } from '../lib/components/AppHeader'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import InitData from '../redux/actions/initData';
import { ContainerThemeVariants } from '../lib/variants/theme.variant';
import { SearchForm } from '../lib/components/SearchForm';
import { ResultContiner } from '../lib/components/ResultContainer';

const MainContainer = styled(motion.div)`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`
const MainWrapper = styled(motion.div)`
	width: 1000px;
	height: auto;
	min-height: 750px;
	padding: 10px 25px;
	border-radius: 5px;
`

const Home: NextPage = () => {
	const dispatch: Dispatch<any> = useDispatch();
	const store: any = useSelector(store => store);

	useEffect(() => {
		dispatch(InitData());
	}, [])

	return (
		<MainContainer
			initial={'light'}
			animate={store.current_theme}
			variants={ContainerThemeVariants}
		>
			<MainWrapper>
				<AppHeader />
				<main>
					<SearchForm />
					<ResultContiner />
				</main>
			</MainWrapper>
		</MainContainer>
	)
}

export default Home
