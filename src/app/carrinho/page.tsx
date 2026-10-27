'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '16px' }}>Seu Carrinho está Vazio</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Você ainda não adicionou nenhum bolo ou doce ao seu carrinho.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#8b4513',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#333', margin: 0 }}>Seu Carrinho de Compras</h1>
        <button
          type="button"
          onClick={clearCart}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#dc3545',
            cursor: 'pointer',
            fontSize: '14px',
            textDecoration: 'underline',
          }}
        >
          Esvaziar Carrinho
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {items.map((item) => {
          const itemTotal = item.price * item.quantity;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              {/* Imagem e Detalhes do Produto */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1', minWidth: '240px' }}>
                <img
                  src={item.productImage || '/placeholder-cake.png'}
                  alt={item.productName}
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: '#333' }}>{item.productName}</h3>
                  <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#666' }}>
                    Apresentação: <strong>{item.sizeName}</strong>
                  </p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>
                    Unitário: R$ {item.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>

              {/* Controlo de Quantidade */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  +
                </button>
              </div>

              {/* Valor Total do Item e Botão Remover */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#8b4513', minWidth: '90px', textAlign: 'right' }}>
                  R$ {itemTotal.toFixed(2).replace('.', ',')}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  style={{
                    backgroundColor: '#fff0f0',
                    color: '#dc3545',
                    border: '1px solid #fbc1c1',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo do Pedido e Botão Concluir */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px', fontSize: '18px' }}>
          <span>Subtotal:</span>
          <strong style={{ color: '#8b4513' }}>R$ {subtotal.toFixed(2).replace('.', ',')}</strong>
        </div>

        <Link
          href="/login"
          style={{
            padding: '14px 28px',
            backgroundColor: '#8b4513',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'inline-block',
          }}
        >
          Avançar para o Login / Finalização →
        </Link>
      </div>
    </div>
  );
} 