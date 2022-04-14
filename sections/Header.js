import Logo from "../components/Logo"
import { useTheme } from 'next-themes'
import { HiMoon, HiSun, HiOutlineChevronDown, HiOutlinePlusCircle, HiOutlineGlobe, HiOutlineDocumentText} from 'react-icons/hi'
import { useState, useEffect, useRef } from 'react'
import useMediaQuery from "../hooks/use-media-query"
import { useSession, signIn } from 'next-auth/react'
import FlyoutMenu  from "../components/FlyoutMenu"
import  MobileMenu  from "../components/MobileMenu"

const links = [
  {
    text: 'Write a new post',
    icon: HiOutlinePlusCircle,
    href: '/new',
  },
  {
    text: 'My posts',
    icon: HiOutlineGlobe,
    href: '/posts/me',
  },
  {
    text: 'My drafts',
    icon: HiOutlineDocumentText,
    href: '/drafts/me',
  },
]

const Header = () => {
  const {systemTheme, theme, setTheme} = useTheme()
  const {data: session, loading} = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef()
  const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false)

  useEffect(() => setMounted(true), [])

  const changeTheme = () => {  
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
      return (
        <HiSun className="w-8 h-8" role="button" onClick={ () => setTheme('light')} />
      )
    } else {
      return (
        <HiMoon className="w-8 h-8" role="button" onClick={ () => setTheme('dark')} />
      )
    }
  }

  return (
    <header className="border-b border-gray-100 dark:border-gray-700">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto sm:px-6">
            <Logo />
            <div className="flex items-center space-x-3">
              
            {changeTheme()}

            {!loading ? (
              <div>
                {!session?.user ? (
                  <button type="button" onClick={() => signIn('google')} className="px-6 py-2 text-lg text-white bg-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"> Sign In </button>
                ) : (
                  <div className="relative" ref={menuRef}>
                    <div
                    className="flex items-center space-x-1 sm:space-x-2"
                    role="button"
                    onClick={() => setMenuOpen(prev => !prev)}
                  >
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-8 h-8 border-2 border-blue-600 rounded-full"
                    />
                    <p className="flex items-center sm:space-x-1">
                      <span className="hidden sm:inline-block">
                        Hello, {session.user.name?.split(' ')?.[0] ?? 'there'}
                      </span>{' '}
                      <HiOutlineChevronDown className="flex-shrink-0 w-4 h-4 mt-1" />
                    </p>
                  </div>

                  <FlyoutMenu
                    links={links}
                    show={isLargeScreen && menuOpen}
                    containerRef={menuRef}
                    onClose={() => setMenuOpen(false)}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        links={links}
        show={!isLargeScreen && menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  )
}

export default Header