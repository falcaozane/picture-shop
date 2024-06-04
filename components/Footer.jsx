import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 p-4 text-center'>
        <p className='text-center text-slate-300'>Made by <Link href="https://falcaozane.netlify.app/" className='no-underline text-white'>@falcaozane</Link></p>
    </footer>
  )
}

export default Footer