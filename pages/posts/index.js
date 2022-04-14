import Layout from "../../sections/Layout"
import InfiniteDataList from "../../components/InfiniteDataList"
import faunaQueries from "../../lib/fauna"

const posts = ({ initialData }) => {
  return (
    <Layout>
        <section className="pt-12 pb-16 text-center sm:pt-24">
            <h1 className="text-4xl font-bold capitalize sm:text-7xl">
                Blog Posts
            </h1>
        </section>
        
        <InfiniteDataList queryKey="/api/posts" initialData={initialData} />
    </Layout>
  )
}

export default posts

export async function getStaticProps() {
    try {
        const initialData = await faunaQueries.getPosts()

        return {
            props: {
                data: initialData,
            },
            revalidate: 1,
        }
    }catch (err) {
        return {
            props: {
                data: []
            }
        }
    }
}