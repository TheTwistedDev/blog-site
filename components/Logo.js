import Link from "next/link"
import { HiOutlineTerminal } from "react-icons/hi"

const Logo = () => {
  return (
      <Link href="/">
        <a className="flex items-center space-x-1 text-blue-600">
            <HiOutlineTerminal className="flex-shrink-0 w-8 h-8"/>
            <span className="text-lg font-bold tracking-tight whitespace-nowrap"> Example Blog site </span>
        </a>
      </Link> 
  )
}
export default Logo