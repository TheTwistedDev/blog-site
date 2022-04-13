import Layout from "../../sections/Layout"
import Card from "../../components/Card"
import faunaQueries from "../../lib/fauna"

const posts = ({ data }) => {
  return (
    <Layout>
        <section className="pt-12 pb-16 text-center sm:pt-24">
            <h1 className="text-4xl font-bold capitalize sm:text-7xl">
                Blog Posts
            </h1>
        </section>
        <div className="max-w-screen-lg gap-8 mx-auto gird sm:grid-cols-2">
            {data.map(post => <Card key={post.id} {...post}/>)}
        </div>
    </Layout>
  )
}

export default posts

export async function getStaticProps() {
    try {
        const {data} = await faunaQueries.getPosts()

        return {
            props: {
                data
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