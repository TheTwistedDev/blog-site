import Logo from "../components/Logo"

const Header = () => {
  return (
      <header className="border-b border-gray-100 dark:border-gray-700">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto sm:px-6">
            {/* Logo */}
            <Logo/>
        </div>        
      </header>
  )
}
export default Header