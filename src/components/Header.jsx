import React from 'react'
import Logo from '../../Logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    // <div className='flex justify-between items-center h-[70px]'>
    <div className='fixed top-0 left-0 w-full z-50 bg-white flex justify-between items-center h-[60px] px-4'>
      <div>
        <Link to='/' className='flex justify-center items-center text-2xl space-x-1 font-semibold text-[#D3145A]'>
          <img src={Logo} width='30px' alt='Borrowland Logo' />
          <span>Borrowland</span>
        </Link>
      </div>
      <div className='flex justify-between items-center cursor-pointer gap-8 text-lg font-semibold text-[#D3145A] '>
        <Link to='/'><div>Home</div></Link>
        <Link to='/my-requests'><div>My-Requests</div></Link>
      </div>
    </div>
  )
}

export default Header