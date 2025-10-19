import React from 'react';
import Image from 'next/image';

import logoImg from '../../assets/logo.svg'
import Link from 'next/link';

function Header() {
  return (
      <Link href="/">
    <header className='py-8 w-full max-w-7xl mx-auto'>
        <Image src={logoImg} alt="Logo" />
    </header>
      </Link>
  )
}

export default Header;