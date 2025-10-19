import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

interface SuccessPageProps {
  searchParams: { session_id?: string }
}

async function getSessionData(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product']
    });

    const customerName = session.customer_details?.name;
    const product = session.line_items?.data[0]?.price?.product as Stripe.Product;

    return {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    };
  } catch (error) {
    console.error('Erro ao buscar sessão:', error);
    return null;
  }
}

export default async function Success({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  const sessionData = await getSessionData(sessionId);

  if (!sessionData) {
    redirect('/');
  }

  const { customerName, product } = sessionData;

  return (
    <main className='flex flex-col items-center justify-center mx-auto m-0 h-[656px]'>
      <h1 className='text-2xl text-gray-100'>Compra efetuada</h1>

      <div className='w-full max-w-[130px] h-[145px] bg-gradient-to-b from-green300 to-[#7465d4] rounded-lg p-1 mt-16 flex items-center justify-center'>
        <Image src={product.imageUrl} width={120} height={110} alt={product.name} />
      </div>

      <p className='text-xl text-gray-300 max-w-[560px] text-center mt-8'>
        Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link className='block mt-20 text-lg no-underline text-green-500 hover:text-green-300 font-bold' href="/">
        Voltar ao catálogo
      </Link>
    </main>
  );
}