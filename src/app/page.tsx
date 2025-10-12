import { Button } from '@/components/Button'
import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'

export default function Home() {
  return (
    <main className='flex flex-col items-start justify-center pl-4'>
      <Header />
     <div className='flex gap-12 w-full ml-auto max-w-custom'>
      <Link href="/product/1" className='bg-gradient-to-b from-green300 to-[#7465d4] rounded-lg p-1 cursor-pointer relative overflow-hidden flex items-center justify-center group'>
        <Image src={camiseta1} width={520} height={480} alt="" className="object-cover" />

        <footer className='absolute bottom-1 left-1 right-1 p-8 bg-black/60 rounded translate-y-full group-hover:translate-y-0 transition-all duration-200 ease-in-out flex items-center justify-between'>
          <strong className='text-xl'>Camiseta X</strong>
          <span className='text-2xl font-semibold text-green-300'>R$ 79,90</span>
        </footer>
      </Link>

      <Link href="/product/2" className='bg-gradient-to-b from-green300 to-[#7465d4] rounded-lg p-1 cursor-pointer relative overflow-hidden flex items-center justify-center group'>
        <Image src={camiseta2} width={520} height={480} alt="" className="object-cover" />

        <footer className='absolute bottom-1 left-1 right-1 p-8 bg-black/60 rounded translate-y-full group-hover:translate-y-0 transition-all duration-200 ease-in-out flex items-center justify-between'>
          <strong className='text-xl'>Camiseta X2</strong>
          <span className='text-2xl font-semibold text-green-300'>R$ 79,90</span>
        </footer>
      </Link>
      <Link href="/product/3" className='bg-gradient-to-b from-green300 to-[#7465d4] rounded-lg p-1 cursor-pointer relative overflow-hidden flex items-center justify-center group'>
        <Image src={camiseta3} width={520} height={480} alt="" className="object-cover" />

        <footer className='absolute bottom-1 left-1 right-1 p-8 bg-black/60 rounded translate-y-full group-hover:translate-y-0 transition-all duration-200 ease-in-out flex items-center justify-between'>
          <strong className='text-xl'>Camiseta X3</strong>
          <span className='text-2xl font-semibold text-green-300'>R$ 79,90</span>
        </footer>
      </Link>
    </div>
    </main>
  );
}