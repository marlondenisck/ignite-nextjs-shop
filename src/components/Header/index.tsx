"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

import logoImg from '../../assets/logo.svg'

function Header() {
  const { itemsCount, openCart } = useCart();

  return (
    <header className='py-8 w-full max-w-7xl mx-auto flex items-center justify-between px-4'>
      <Link href="/">
        <Image src={logoImg} alt="Logo" />
      </Link>

      <button 
        onClick={openCart}
        className='relative p-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors'
      >
        {/* Ícone do carrinho */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-gray-300"
        >
          <path 
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16 5 16H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M9 19C7.9 19 7 19.9 7 21S7.9 23 9 23 11 21.9 11 21 10.1 19 9 19ZM20 19C18.9 19 18 19.9 18 21S18.9 23 20 23 22 21.9 22 21 21.1 19 20 19Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Badge com número de itens */}
        {itemsCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold'>
            {itemsCount}
          </span>
        )}
      </button>
    </header>
  )
}

export default Header;