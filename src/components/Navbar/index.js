import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between'>
        <Link href="/">Home</Link>
        <button>Login</button>
    </nav>
  )
}

export default Navbar