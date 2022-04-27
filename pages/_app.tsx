import Head from 'next/head'
import { Provider } from 'react-redux'
import { mainStore } from '../redux/store/mainStore'

import type { AppProps } from 'next/app'

import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	return <Provider store={mainStore}>
		<Head>
			<title>Get github user info</title>
		</Head>
		<Component {...pageProps} />
	</Provider>
}

export default MyApp
