"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

interface SessionData {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      router.push('/');
      return;
    }

    // Buscar dados da sessão
    async function fetchSessionData() {
      try {
        const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Erro ao buscar sessão');
        }

        const data = await response.json();
        setSessionData(data);
        
        // Limpar carrinho após sucesso
        clearCart();
      } catch (error) {
        console.error('Erro:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    }

    fetchSessionData();
  }, [searchParams, router, clearCart]);

  if (loading) {
    return (
      <main className='flex flex-col items-center justify-center mx-auto m-0 h-[656px]'>
        <p className='text-xl text-gray-100'>Carregando...</p>
      </main>
    );
  }

  if (!sessionData) {
    return null;
  }

  const { customerName, products } = sessionData;

  return (
    <main className='flex flex-col items-center justify-center mx-auto m-0 h-[656px] px-4'>
      <h1 className='text-2xl text-gray-100'>Compra efetuada!</h1>

      {/* Exibir produtos comprados */}
      <div className='flex flex-wrap gap-4 mt-8 justify-center'>
        {products.map((product, index) => (
          <div 
            key={index}
            className='w-[130px] h-[145px] bg-gradient-to-b from-green300 to-[#7465d4] rounded-lg p-1 flex items-center justify-center'
          >
            <Image 
              src={product.imageUrl} 
              width={120} 
              height={110} 
              alt={product.name}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <p className='text-xl text-gray-300 max-w-[560px] text-center mt-8'>
        Uhuul <strong>{customerName}</strong>, sua{products.length > 1 ? 's' : ''} compra{products.length > 1 ? 's' : ''} de{' '}
        <strong>
          {products.length === 1 
            ? products[0].name
            : `${products.length} itens`
          }
        </strong> já {products.length > 1 ? 'estão' : 'está'} a caminho da sua casa.
      </p>

      <Link className='block mt-20 text-lg no-underline text-green-500 hover:text-green-300 font-bold' href="/">
        Voltar ao catálogo
      </Link>
    </main>
  );
}