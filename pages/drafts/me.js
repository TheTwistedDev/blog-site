import { useSession } from 'next-auth/react'
import { isAuthenticated } from '../../lib/utils'
import { Layout } from '../../sections/index'
import { InfiniteDataList } from '../../components/index'

const MyDrafts = ({ initialData }) => {
  const {data: session, loading} = useSession()

  const queryKey = session?.user
    ? `/api/drafts?author=${session.user.email}`
    : '/api/drafts'

  return (
    <Layout pageMeta={{ title: 'My drafts' }}>
      <section className="pt-12 pb-16 text-center sm:pt-24">
        <h1 className="text-4xl font-bold capitalize sm:text-7xl">My drafts</h1>
      </section>

      {!loading ? (
        <InfiniteDataList queryKey={queryKey} initialData={initialData} />
      ) : null}
    </Layout>
  )
}

export const getServerSideProps = isAuthenticated

export default MyDrafts