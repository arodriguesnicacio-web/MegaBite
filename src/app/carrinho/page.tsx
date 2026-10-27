'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const cartContext = useCart() as any;
  const items = cartContext.items || [];
  const subtotal = cartContext.subtotal || 0;
  
  // Suporta tanto 'removeItem' quanto 'removeFromCart' para evitar erros de tipo no TypeScript
  const removeItem = cartContext.removeItem || cartContext.removeFromCart || (() => {});
  const updateQuantity = cartContext.updateQuantity || (() => {});

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '16px' }}>Seu carrinho está vazio</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Explore o nosso catálogo e adicione os melhores bolos e doces artesanais!
        </p>
        <Link
          href="/produtos"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#6B3E2E',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '24px' }}>Seu Carrinho de Compras</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {items.map((item: any) => (
          <div
            key={`${item.productId}-${item.sizeName}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: '#333' }}>
                {item.productName}
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                Opção: {item.sizeName} | Preço: R$ {item.price?.toFixed(2).replace('.', ',')}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.productId, item.sizeName, parseInt(e.target.value) || 1)
                }
                style={{
                  width: '60px',
                  padding: '6px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  textAlign: 'center',
                }}
              />
              <button
                type="button"
                onClick={() => removeItem(item.productId, item.sizeName)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#dc3545',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total: </span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#6B3E2E' }}>
            R$ {subtotal?.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <Link
          href="/checkout"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#6B3E2E',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Ir para Finalização (Checkout) →
        </Link>
      </div>
    </div>
  );
} 