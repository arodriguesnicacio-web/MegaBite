'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eaeaea',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo / Nome do Estabelecimento */}
        <Link
          href="/"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#8b4513',
            textDecoration: 'none',
          }}
        >
          MegaBite 🧁
        </Link>

        {/* Links de Navegação e Botão do Carrinho */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link
            href="/"
            style={{
              color: '#333',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Catálogo
          </Link>

          {/* Botão de Visualização do Carrinho com Contador */}
          <Link
            href="/carrinho"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#8b4513',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'background-color 0.2s ease',
            }}
          >
            <span>🛒 Carrinho</span>
            {totalItems > 0 && (
              <span
                style={{
                  backgroundColor: '#ffffff',
                  color: '#8b4513',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
} 