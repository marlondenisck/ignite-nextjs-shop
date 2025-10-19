"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  imageUrl: string
  price: number
  defaultPriceId: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  itemsCount: number
  totalPrice: number
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Calcular total de itens
  const itemsCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calcular preço total
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0)

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('@ignite-shop:cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('@ignite-shop:cart', JSON.stringify(items))
  }, [items])

  // Adicionar item ao carrinho
  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Se o produto já existe, aumenta a quantidade
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Se é um produto novo, adiciona com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  // Remover item do carrinho
  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  // Limpar carrinho
  const clearCart = () => {
    setItems([])
  }

  // Abrir carrinho
  const openCart = () => {
    setIsOpen(true)
  }

  // Fechar carrinho
  const closeCart = () => {
    setIsOpen(false)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemsCount,
        totalPrice,
        addItem,
        removeItem,
        clearCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook para usar o context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}