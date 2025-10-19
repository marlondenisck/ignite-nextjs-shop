"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
}

interface ProductSliderProps {
  products: Product[]
}

export default function ProductSlider({ products }: ProductSliderProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <div 
      className='flex w-full ml-auto max-w-custom keen-slider'
      ref={sliderRef}
    >
      {products.map((product) => (
        <Link 
          key={product.id}
          href={`/product/${product.id}`} 
          className='bg-gradient-to-b from-green-300 to-[#7465d4] rounded-lg cursor-pointer relative overflow-hidden flex items-center justify-center group keen-slider__slide'
          prefetch={false}
        >
          <Image src={product.imageUrl} width={520} height={480} alt={product.name} className="object-cover" />

          <footer className='absolute bottom-1 left-1 right-1 p-8 bg-black/60 rounded translate-y-full group-hover:translate-y-0 transition-all duration-200 ease-in-out flex items-center justify-between'>
            <strong className='text-xl'>{product.name}</strong>
            <span className='text-2xl font-semibold text-green-300'>
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </footer>
        </Link>
      ))}
    </div>
  )
}