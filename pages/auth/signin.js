import  { getProviders, signIn, getSession } from "next-auth/react"
import Footer from "../../sections/Footer"
import Head from 'next/head'
import { useRouter } from 'next/router'

function signin({ providers }) {

    const router = useRouter()

    const meta = {
        title: "Signin Page",
        description: "Signin page for blog site",
        type: "website",

    }

  return (
    <div >
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
        <div className="flex flex-col items-center justify-between h-screen">
            <div className="mt-20 max-w-4xl mx-auto space-y-4 text-center">
                <h1 className="text-4xl font-bold capitalize ">
                    <span className="block">Welcome please select </span>
                    <span className="block">Your preferred provider</span>
                </h1>
            </div>
            {Object.values(providers).map((provider) => {
                return (
                <div key={provider.name} className=" p-6 transition-shadow border rounded-md w-fit dark:border-gray-700 dark:bg-gray-800 hover:shadow-xl">
                    <button onClick={() => signIn(provider.id)} className="px-6 py-3 text-lg text-white bg-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap">
                    Sign in with {provider.name}
                    </button>
                </div>
                )
            })}    
            <div className="">
                <Footer/>
            </div>
        </div>
        
    </div>
  )
}

export default signin

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: "/" },
    }
  }

  return {
    props: {
      providers: await getProviders(context),
    },
  }
}