import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import axios from 'axios'
import { fetcher, isAuthorized } from '../../lib/utils'
import { Layout } from '../../sections/index'
import { Editor } from '../../components/index'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import toast from 'react-hot-toast'

const Edit = ({ initialData }) => {
  const router = useRouter()
  const {data: session} = useSession()
  const { data, error, mutate } = useSWR(
    () => (session?.user ? `/api/posts/${router?.query?.id}` : null),
    fetcher,
    initialData
  )
  const [publishing, setPublishing] = useState(false)

  const handleOnPublish = async (title, content) => {
    let toastId
    try {
      if (title) {
        setPublishing(true)
        toastId = toast.loading('Publishing...')
        // Perform query
        const { data } = await axios.patch(
          `/api/posts/publish/${router?.query?.id}`,
          {
            title,
            content,
          }
        )
        // Update cache, but disable the revalidation
        mutate(data, false)
        // Display success message
        toast.success('Redirecting...', { id: toastId })
        // Redirect to post page
        router.push(`/posts/${data.slug}`)
      } else {
        toast.error('Looks like you forgot to add a title!')
      }
    } catch (error) {
      // Display error message
      toast.error('Unable to publish post', { id: toastId })
      setPublishing(false)
    }
  }

  const handleOnDelete = async () => {
    if (window.confirm('Do you really want to delete this post?')) {
      let toastId
      try {
        // Display loading state...
        toastId = toast.loading('Deleting...')
        // Perform query
        await axios.delete(`/api/posts/${data.id}`)
        // Update cache, but disable the revalidation
        mutate(null, false)
        // Remove toast
        toast.dismiss(toastId)
        // Redirect
        router.push(`/posts/me`)
      } catch (error) {
        // Display error message
        toast.error('Unable to delete this post', { id: toastId })
      }
    }
  }

  if (error) {
    return (
      <Layout pageMeta={{ title: 'Error' }}>
        <div className="flex justify-center my-12">
          <p className="flex items-center justify-center w-full max-w-screen-sm p-4 space-x-1 text-lg text-center text-red-500 bg-gray-100 rounded-md dark:bg-gray-800">
            <HiOutlineExclamationCircle className="flex-shrink-0 w-6 h-6" />
            <span>Unable to retrieve post!</span>
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout pageMeta={{ title: 'Write blog post' }}>
      <div className="py-8 sm:py-12">
        {data ? (
          <Editor
            initialData={data}
            showDeleteButton={true}
            showPublishButton={true}
            disabled={publishing}
            onPublish={handleOnPublish}
            onDelete={handleOnDelete}
          />
        ) : null}
      </div>
    </Layout>
  )
}

export const getServerSideProps = isAuthorized

export default Edit