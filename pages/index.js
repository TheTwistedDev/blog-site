import Layout from "../sections/Layout"
import { useSession, signIn } from 'next-auth/react'
import { GoPencil } from 'react-icons/go'
import { HiOutlineBookOpen } from 'react-icons/hi'
import Link from 'next/link'



export default function Home() {

  const {data: session, loading} = useSession()

  return (
    <div>
      <Layout>
        {/* Hero section */}
        <section className="flex flex-col items-center justify-center mt-12 space-y-10 sm:mt-24 md:mt-32">
             {/* Headlines */}
             <div className="max-w-4xl mx-auto space-y-4 text-center">
              <h1 className="text-4xl font-bold capitalize sm:text-7xl">
                <span className="block">An example blogging platform </span>
                <span className="block">for whoever you want</span>
              </h1>
              <h2 className="text-xl font-medium sm:text-2xl">
                Start your blog, share ideas, and connect with other people in the blogging community!
              </h2>
             </div>
             {/* CTA */}
             <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
             {loading ? null : !session ? (
             <button type="button" onClick={() => signIn()} className="px-6 py-3 text-lg text-white bg-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap">

                Start your first blog here

              </button>
              ) : (
                <Link href="/new">
                  <a className="flex items-center justify-center px-6 py-3 space-x-2 text-lg text-white bg-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap">
                    <GoPencil className="flex-shrink-0 w-6 h-6"/>
                    <span> Write a blog post </span>
                  </a>
                </Link>
             )}
             <Link href="/posts">
               <a className="flex items-center justify-center w-full px-6 py-3 space-x-2 text-lg text-blue-600 bg-transparent border-2 border-blue-600 rounded-md sm:text-xl focus:outline-none whitespace-nowrap">
                 <HiOutlineBookOpen className="flex-shrink-0 w-6 h-6"/>
                 <span> Read the blog  </span>
               </a>
             </Link>
             </div>
          </section>
      </Layout>
    </div>
  )
}
