import faunaQueries from "../../lib/fauna"
import { formatDate } from "../../lib/utils"
import Layout from "../../sections/Layout"
import { useRouter } from 'next/router'


const Post = ({ title = '', content = '', author = null, published_at = '' }) => {

    const router = useRouter()

    const pageMeta = {
        type: 'article',
        title,
        description: content.slice(0, 250),
        data: published_at,
    }


  return (
    <Layout pageMeta={pageMeta}>
        {router.isFallback ? (
            <p className="py-12 text-lg text-center">Loading ... </p>
        ) : (
        <article className="max-w-screen-lg py-12 mx-auto space-y-16">
            <header>
                <h1 className="w-full max-w-screen-md mb-4 text-3xl font-extrabold leading-tight lg:text-6xl md:text-5xl sm:text-4xl">
                    {title}
                </h1>

                {/** Author */}
                <div className="flex items-center space-x-2">
                    <img src={author?.image}
                         alt={author?.name}
                         className="flex-shrink-0 w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-col pl-2">
                        <p className="font-bold ">{author?.name}</p>
                        <p className="text-gray-500">{formatDate(published_at)}</p>
                    </div>
                </div>
                    
            </header>

            <main>{content}</main>
        </article>
        )}
    </Layout>
  )
}
export default Post

export async function getStaticPaths() {
    let slugs = [], cursor = null

    do {
        const {data, after} = await faunaQueries.getAllSlugs({ after: cursor })
        slugs = [...slugs, ...data]
        cursor = after
    } while (cursor)

    return {
        paths: slugs.map(slug => ({
            params: { slug },
        })),
        fallback: true,
    }

}

export async function getStaticProps({ params }) {
    try {
        const data = await faunaQueries.getPostsBySlug(params.slug)

        return {
            props: data,
            revalidate: 1,  
        }
    } catch (err) {
        return {
            notFound: true,
        }
    }
}

