import { useEffect, useRef } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { HiOutlineLogout } from 'react-icons/hi'

const FlyoutMenu = ({
  links = [],
  show = false,
  containerRef = null,
  onClose = () => null,
}) => {
  const router = useRouter()

  useEffect(() => {
    function mouseDownListener(event) {
      // Do nothing if the event was already processed
      if (event.defaultPrevented) return
      // Check if click is outside the menu
      if (
        containerRef?.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClose()
      }
    }

    function keyDownListener(event) {
      // Do nothing if the event was already processed
      if (event.defaultPrevented) return
      // Check if click is outside the menu
      if (event.code === 'Escape') {
        onClose()
      }
    }

    if (show) {
      window.addEventListener('mousedown', mouseDownListener)
      window.addEventListener('keydown', keyDownListener)
    }

    return () => {
      window.removeEventListener('mousedown', mouseDownListener)
      window.removeEventListener('keydown', keyDownListener)
    }
  }, [show])

  const redirect = href => {
    // Close menu
    onClose()
    // and redirect
    router.push(href)
  }

  if (!show) return null

  return (
    <div className="absolute right-0 z-50 hidden top-10 w-80 sm:block">
      <div className="text-gray-900 divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-gray-900 dark:ring-gray-700 ring-opacity-5 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:divide-gray-700">
        <div className="p-5 space-y-8">
          {/* Navigation */}
          <nav className="grid gap-y-8">
            {links.map(({ text, href, icon: Icon }) => (
              <p
                key={text}
                onClick={() => redirect(href)}
                className="flex items-center p-3 -m-3 space-x-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Icon className="flex-shrink-0 text-blue-600 h-7 w-7" />
                <span className="font-medium capitalize">{text}</span>
              </p>
            ))}
          </nav>
        </div>

        {/* Sign out */}
        <div className="px-5 py-3">
          <button
            type="button"
            onClick={signOut}
            className="flex items-center justify-center px-2 py-1 -mx-2 -my-1 space-x-2 rounded opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <HiOutlineLogout className="flex-shrink-0 h-7 w-7" />
            <span className="font-medium capitalize">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlyoutMenu