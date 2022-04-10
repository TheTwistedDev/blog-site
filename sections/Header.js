import Logo from "../components/Logo"

const Header = () => {

  return (

    <header className="border-b border-gray-100 ">
        <div className="container px-4 py-4 mx-auto sm:px-6">
          <Logo />
        </div>
    </header>

  )
}

export default Header