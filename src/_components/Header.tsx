import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-red-200 text-sm py-3 px-4 dark:bg-neutral-800">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
    <Link className="flex-none font-bold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white" href="/" aria-label="Brand">Contact List Project</Link>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
      <Link href='/create' className="font-medium text-blue-500 focus:outline-none bg-white px-2 " aria-current="page">Create New Contact</Link>
      
    </div>
  </nav>
</header>
  )
}

export default Header
