import { useSession } from 'next-auth/react'
import { isAuthenticated } from '../../lib/utils'
import { Layout } from '../../sections/index'
import { InfiniteDataList } from '../../components/index'

const MyPosts = ({ initialData }) => {
  const {data: session, loading} = useSession()

  const queryKey = session?.user
    ? `/api/posts?author=${session.user.email}`
    : '/api/posts'

  return (
    <Layout pageMeta={{ title: 'My posts' }}>
      <section className="pt-12 pb-16 text-center sm:pt-24">
        <h1 className="text-4xl font-bold capitalize sm:text-7xl">My posts</h1>
      </section>

      {!loading ? (
        <InfiniteDataList queryKey={queryKey} initialData={initialData} />
      ) : null}
    </Layout>
  );
};

export const getServerSideProps = isAuthenticated

export default MyPosts