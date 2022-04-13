import Logo from "../components/Logo"
import { useTheme } from 'next-themes'
import { HiMoon, HiSun, HiOutlineChevronDown } from 'react-icons/hi'
import { useState, useEffect, useRef } from 'react'
import useMediaQuery from "../hooks/use-media-query"
import { useSession, signIn } from 'next-auth/react'
import FlyoutMenu  from "../components/FlyoutMenu"
import  MobileMenu  from "../components/MobileMenu"

const Header = () => {
  const {systemTheme, theme, setTheme} = useTheme()
  const {data: session, loading} = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const containerRef = useRef()
  const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false)

  const changeTheme = () => {  
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
                {!session ? (
                  <button type="button" onClick={() => signIn('google')} className="px-6 py-2 text-lg text-white bg-blue-600 border-2 border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"> Sign In </button>
                ) : (
                  <div className="relative" ref={containerRef}>
                    <button onClick={() => setMenuOpen(prev => !prev)} className="flex items-center space-x-1 sm:space-x-2">
                      <img src={session.user.image} alt={session.user.name} className="w-8 h-8 border-2 border-blue-600 rounded-full" />
                        <p className="flex items-center sm:space-x-1"> 
                          <span className="hidden sm:inline-block">
                            Hello, {session.user.name?.split(' ')?.[0] ?? 'there'}
                          </span> 
                          <HiOutlineChevronDown className="flex-shrink-0 w-4 h-4 mt-1"/>
                        </p>
                    </button>
                    <FlyoutMenu show={menuOpen && isLargeScreen} onClose={() => setMenuOpen(false)} containerRef={containerRef}/>
                  </div>
                )}
              </div>
            ): null}
          </div>
        </div>
        <MobileMenu show={menuOpen && !isLargeScreen} onClose={() => setMenuOpen(false)} />
    </header>
    
  )
}

export default Header