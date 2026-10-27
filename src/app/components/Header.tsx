'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { authClient } from '@/lib/auth-client';

export default function Header() {
  const { totalItems } = useCart();
  const { data: session } = authClient.useSession();

  return (
    <header
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f3f4f6',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo Original */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#78350f',
            }}
          >
            MegaBite
          </span>
        </Link>

        {/* Navigation & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginRight: '8px',
            }}
          >
            <Link
              href="/"
              style={{
                color: '#374151',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              Catálogo
            </Link>
            <Link
              href="/sobre"
              style={{
                color: '#374151',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              Sobre
            </Link>
          </nav>

          {/* Botão do Carrinho com Contador (Antes do Botão de Entrar) */}
          <Link
            href="/carrinho"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#78350f',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontWeight: '600',
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            <span>🛒 Carrinho</span>
            {totalItems > 0 && (
              <span
                style={{
                  backgroundColor: '#ffffff',
                  color: '#78350f',
                  borderRadius: '9999px',
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

          {/* Botão de Login / Perfil */}
          {session ? (
            <Link
              href="/perfil"
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#78350f',
                border: '1px solid rgba(120, 53, 15, 0.2)',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Minha Conta
            </Link>
          ) : (
            <Link
              href="/login"
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                padding: '8px 12px',
                textDecoration: 'none',
              }}
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 