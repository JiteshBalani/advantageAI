import React from 'react'
import Logo from '../../Logo.png'
import { Link } from 'react-router-dom'
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'

const Header = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-white flex justify-between items-center h-[60px] px-4 shadow-md'>
      {/* Logo Section */}
      <Link to='/' className='flex items-center space-x-2 text-2xl font-semibold text-[#D3145A]'>
        <img src={Logo} width='30px' alt='Borrowland Logo' />
        {/* Show 'Borrowland' text only on screens ≥ sm */}
        <span className='hidden sm:block'>Borrowland</span>
      </Link>

      {/* Navigation Icons */}
      <div className='flex items-center gap-6 text-[#D3145A] text-lg font-semibold'>

        {/* Desktop Text Labels */}
        <Link to='/' className='hidden sm:flex items-center gap-1'>
          <HomeOutlined />
          <span>Home</span>
        </Link>

        <Link to='/my-requests' className='hidden sm:flex items-center gap-1'>
          <UnorderedListOutlined />
          <span>My Requests</span>
        </Link>

        {/* Mobile Only Icons */}
        <Link to='/' className='block sm:hidden'>
          <HomeOutlined className='text-2xl' />
        </Link>

        <Link to='/my-requests' className='block sm:hidden'>
          <UnorderedListOutlined className='text-2xl' />
        </Link>

      </div>
    </div>
  )
}

export default Header
