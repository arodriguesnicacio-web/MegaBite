'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartContextType } from '@/types/cart';

// Ajustamos o tipo localmente para garantir compatibilidade caso o seu types/cart.ts
// ainda esteja a pedir "addItem" ou "addToCart".
export interface UpdatedCartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
}

const CartContext = createContext<UpdatedCartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carrega o carrinho salvo no localStorage ao iniciar (se existir)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('megabite_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Erro ao carregar o carrinho local:', e);
    }
  }, []);

  // Salva no localStorage sempre que os itens do carrinho mudarem
  useEffect(() => {
    try {
      localStorage.setItem('megabite_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Erro ao salvar o carrinho local:', e);
    }
  }, [items]);

  // NOME CORRIGIDO DE addItem PARA addToCart PARA COMBINAR COM OS BOTÕES
  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    // Identificador único combinando o ID do produto com a variação/tamanho
    const sizeName = newItem.sizeName || 'Padrao';
    const itemId = `${newItem.productId}-${sizeName.replace(/\s+/g, '-').toLowerCase()}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        // Se já existe no carrinho, apenas soma a quantidade
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }

      // Se é um item ou tamanho novo, adiciona à lista
      return [...prevItems, { ...newItem, id: itemId }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart, // Exporta com o nome correto
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}