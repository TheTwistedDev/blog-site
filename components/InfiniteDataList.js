import useInfiniteQuery from "../hooks/use-infinite-query"
import toast from 'react-hot-toast'
import { HiExclamationMark } from 'react-icons/hi'
import CardSkeleton from "./CardSkeleton"
import Card from './Card'
import { useRef, useEffect } from "react"
import { isInViewport } from '../lib/utils';
import { useDebouncedCallback } from 'use-debounce';

const InfiniteDataList = ({ queryKey, initialData }) => {
    const moreRef = useRef()

    const {
        data,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingInitialData,
        isFetchingNextPage,
    } = useInfiniteQuery(queryKey, initialData)

    // Debounced callback to fetch more data
  const loadMore = useDebouncedCallback(() => {
    if (isInViewport(moreRef.current)) {
      fetchNextPage()
    }
  }, 500)

  // Fetch more data when scrolling to the end of the list
  useEffect(() => {
    window.addEventListener('scroll', loadMore)

    return () => {
      window.removeEventListener('scroll', loadMore)
    }
  }, [])

  // Something went wrong
  if (error) {
    toast.error('Unable to fetch data...')
  }
    // Fetching done and no data to render
    if(!isFetchingInitialData && data?.length === 0) {
        return (
            <div className="flex justify-center">
                <p className="flex items-center justify-center w-full max-w-screen-sm p-4 space-x-1 text-lg text-center bg-gray-100 rounded-md dark:bg-gray-800">
                    <HiExclamationMark className="flex-shrink-0 w-6 h-6"/>
                    <span>No blog posts yet!</span>
                </p>
            </div>
        )
    }

    // Render data grid + skeletons when fetching more data
  return (
    <div>
      <div className="grid max-w-screen-lg gap-8 mx-auto sm:grid-cols-2">
        {data?.map(item => (
          <Card key={item.id} {...item} />
        ))}

        {isFetchingNextPage
          ? [...new Array(10)].map((_, i) => <CardSkeleton key={i} />)
          : null}
      </div>

      {hasNextPage ? (
        <div ref={moreRef} />
      ) : (
        <p className="mt-20 text-lg text-center text-gray-500">
          No more data...
        </p>
      )}
    </div>
  )
}

export default InfiniteDataList