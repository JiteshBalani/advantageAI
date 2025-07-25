import React from 'react'
import Logo from '../../Logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-between items-center h-[70px]'>
      <div>
        <Link to='/' className='flex justify-center items-center text-2xl space-x-1 font-semibold text-[#D3145A]'>
          <img src={Logo} width='40px' alt='Borrowland Logo' />
          <span>Borrowland</span>
        </Link>
      </div>
      <div className='flex justify-between items-center cursor-pointer space-x-2 text-lg font-medium '>
        <Link to='/'><div>Home</div></Link>
        <Link to='/my-requests'><div>My-Requests</div></Link>
        <Link to='/add-item'><button className='py-1 px-2 border cursor-pointer bg-amber-400'>Add Item</button></Link>
      </div>
    </div>
  )
}

export default Header