import ReactDOM from 'react-dom'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { Logo } from './Logo'
import { HiOutlineLogout, HiX } from 'react-icons/hi'

const MobileMenu = ({ 
    links = [], 
    show = false, onClose = () => null }) => {
  const router = useRouter();

  const redirect = href => {
    // Close menu
    onClose();
    // and redirect
    router.push(href);
  };

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-x-0 top-0 z-50 p-2 sm:hidden">
      <div className="text-gray-900 divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-gray-900 dark:ring-gray-700 ring-opacity-5 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 dark:divide-gray-700">
        <div className="px-5 pt-4 pb-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Logo />

            {/* Close menu */}
            <div className="-mr-2">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
              >
                <span className="sr-only">Close menu</span>
                <HiX className="flex-shrink-0 w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="grid gap-y-8">
            {links.map(({ text, href, icon: Icon }) => (
              <p
                key={text}
                href={href}
                onClick={() => redirect(href)}
                className="flex items-center p-3 -m-3 space-x-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Icon className="flex-shrink-0 text-blue-600 h-7 w-7" />
                <span className="font-medium capitalize">{text}</span>
              </p>
            ))}
          </nav>
        </div>

        {/* Sign out */}
        <div className="px-5 py-4">
          <button
            type="button"
            onClick={() => signOut()}
            className="flex items-center justify-center px-2 py-1 -mx-2 -my-1 space-x-2 rounded opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <HiOutlineLogout className="flex-shrink-0 h-7 w-7" />
            <span className="font-medium capitalize">Sign Out</span>
          </button>
        </div>
      </div>
    </div>,
    document.documentElement
  );
};

export default MobileMenu;