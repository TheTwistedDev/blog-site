import '../styles/globals.css'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ThemeProvider } from 'next-themes'
import { SessionProvider as AuthProvider } from 'next-auth/react'

  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ 
  Component, 
  pageProps :  {session, ...pageProps },
}) {

  return (
    <AuthProvider session={session} >
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
