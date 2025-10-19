"use client"

import React from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

export default function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    removeItem, 
    totalPrice, 
    itemsCount 
  } = useCart()

  async function handleFinishPurchase() {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            price: item.defaultPriceId,
            quantity: item.quantity,
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao processar pagamento. Tente novamente.')
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[480px] bg-gray-800 z-50 p-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-100">Sacola de compras</h2>
          <button 
            onClick={closeCart}
            className="text-gray-400 hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center mt-20">
              Sua sacola está vazia
            </p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-5">
                  {/* Imagem do produto */}
                  <div className="w-24 h-24 bg-gradient-to-b from-green-300 to-[#7465d4] rounded-lg p-1 flex items-center justify-center">
                    <Image 
                      src={item.imageUrl} 
                      width={80} 
                      height={80} 
                      alt={item.name} 
                      className="object-cover"
                    />
                  </div>

                  {/* Informações do produto */}
                  <div className="flex-1">
                    <h3 className="text-gray-100 font-medium mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-lg mb-2">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.price)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-gray-400 text-sm">
                        Quantidade: {item.quantity}
                      </p>
                    )}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-green-500 font-bold text-sm mt-2 hover:text-green-300"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="mt-8 space-y-4">
            {/* Quantidade e Total */}
            <div className="flex items-center justify-between">
              <span className="text-gray-100">Quantidade</span>
              <span className="text-gray-300 text-lg">
                {itemsCount} {itemsCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
            
            <div className="flex items-center justify-between font-bold text-xl">
              <span className="text-gray-100">Valor total</span>
              <span className="text-gray-100">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(totalPrice)}
              </span>
            </div>

            {/* Botão de finalizar */}
            <button 
              onClick={handleFinishPurchase}
              className="w-full bg-green-500 text-white py-5 rounded-lg font-bold text-lg hover:bg-green-300 transition-colors mt-6"
            >
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </>
  )
}