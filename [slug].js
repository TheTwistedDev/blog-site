import { useRouter } from 'next/router';
import faunaQueries from './lib/fauna';
import { formatDate } from './lib/utils';
import Layout from './sections/Layout';

const Post = ({
  title = '',
  content = '',
  author = null,
  published_at = '',
}) => {
  const router = useRouter()

  const pageMeta = {
    type: 'article',
    title,
    description: content.slice(0, 250),
    date: published_at,
  }

  return (
    <Layout pageMeta={pageMeta}>
      {router.isFallback ? (
        <p className="py-12 text-lg text-center">Loading...</p>
      ) : (
        <article className="max-w-screen-lg py-12 mx-auto space-y-16">
          <header className="space-y-8">
            <h1 className="w-full max-w-screen-md text-3xl font-extrabold leading-tight lg:text-6xl md:text-5xl sm:text-4xl">
              {title}
            </h1>

            <div className="flex flex-col py-6 space-y-4 border-t border-b sm:flex-row sm:justify-between sm:items-center sm:space-y-0 sm:space-x-4 dark:border-gray-700">
              {/* Author */}
              <div className="flex items-center space-x-2">
                <img
                  src={author?.image}
                  alt={author?.name}
                  className="flex-shrink-0 w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-semibold">{author?.name}</p>
                  <p className="text-gray-500">{formatDate(published_at)}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="prose sm:prose-lg lg:prose-xl dark:prose-dark max-w-none">
            {content}
          </main>
        </article>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  let slugs = [],
    cursor = null

  do {
    const { data, after } = await faunaQueries.getAllSlugs({ after: cursor });
    cursor = after;
    slugs = [...slugs, ...data];
  } while (cursor)

  return {
    // Existing posts are rendered to HTML at build time
    paths:
      slugs?.map(slug => ({
        params: { slug },
      })) ?? [],
    // Enable statically generating additional pages
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  try {
    const data = await faunaQueries.getPostBySlug(params.slug)

    return {
      props: data,
    }
  } catch (error) {
    return { notFound: true }
  }
}

export default Post
