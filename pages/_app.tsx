// vendors
import type { AppProps } from 'next/app'
// components
import { Layout } from '../components'
// styles
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
