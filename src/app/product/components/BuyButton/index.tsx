"use client";

import { useCart } from '@/contexts/CartContext';

interface BuyButtonProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    defaultPriceId: string;
  }
}

export default function BuyButton({ product }: BuyButtonProps) {
  const { addItem, items } = useCart();

  // Verificar se o produto já está no carrinho
  const isItemInCart = items.some(item => item.id === product.id);

  function handleAddToCart() {
    if (!isItemInCart) {
      addItem({
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        defaultPriceId: product.defaultPriceId,
      });
    }
  }

  return (
    <button 
      className={`mt-auto border-0 text-white rounded-[8px] p-5 cursor-pointer font-bold text-base transition-colors ${
        isItemInCart 
          ? 'bg-green-300 cursor-not-allowed' 
          : 'bg-green-500 hover:bg-green-300'
      }`}
      onClick={handleAddToCart}
      disabled={isItemInCart}
    >
      {isItemInCart ? 'Produto já está na sacola' : 'Adicionar à sacola'}
    </button>
  );
}