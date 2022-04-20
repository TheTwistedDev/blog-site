import Link from 'next/link';
import Layout from '../sections/Layout'

const NotFound = () => {
  return (
    <Layout
        pageMeta={{
            title: "Oops! You found a missing page ...",
        }}
    >
        <div className="container flex flex-col items-center justify-center h-full py-16 mx-auto space-y-12">
            <div className="space-y-6 text-center">
                <h1 className="text-3xl sm:text-6xl"> 404 - Page Not Found</h1>
                <p className="text-xl"> We Can't find the page you are looking for. </p>                
            </div>
            <Link href="/">
                <a className="px-6 py-3 text-lg text-white bg-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap">
                 Go Back Home
             </a>
            </Link>
            
        </div>

    </Layout>
  )
}
export default NotFound
