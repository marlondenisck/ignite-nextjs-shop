import React from 'react';
import Image from 'next/image';

import logoImg from '../../assets/logo.svg'

function Header() {
  return (
    <header className='py-8 w-full max-w-7xl mx-auto'>
      <Image src={logoImg} alt="Logo" />
    </header>
  )
}

export default Header;