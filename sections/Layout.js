import Header from "./Header"
import Footer from "./Footer"

const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
            <main className="container flex-grow px-4 mx-auto sm:px-6">{children}</main>
        <Footer/>
    </div>
  )
}
export default Layout