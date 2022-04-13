import Header from "./Header"
import Footer from "./Footer"
import Head from 'next/head'
import { useRouter } from 'next/router'

const Layout = ({ children, pageMeta }) => {
  const router = useRouter()

  const meta = {
    title: "An Example Blogging Site",
    description: "Start your blog, share ideas, and connect with other people in the blogging community!",
    type: "website",
    ...pageMeta,

  }

  return (
    <>
      <Head>
        <title> {meta.title} </title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/favicon.ico"/>
        {/** Open Graph */}
        <meta property="og:url" content={`http://localhost:3000${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Example Blog Site" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        { meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}

      </Head>

      <div className="flex flex-col min-h-screen">
        <Header/>
            <main className="container flex-grow px-4 mx-auto sm:px-6">{children}</main>
        <Footer/>
      </div>
    </>
   
  )
}
export default Layout