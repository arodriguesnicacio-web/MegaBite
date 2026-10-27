'use client';

import React from 'react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div style={{ maxWidth: '700px', margin: '60px auto', padding: '30px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
      <h1 style={{ color: '#6B3E2E', marginBottom: '12px' }}>Pedido Confirmado com Sucesso!</h1>
      <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
        Obrigado por comprar no MegaBite! A sua encomenda já foi recebida e está sendo preparada pela nossa equipe artesanal.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link
          href="/produtos"
          style={{
            padding: '12px 24px',
            backgroundColor: '#6B3E2E',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Voltar ao Catálogo
        </Link>
      </div>
    </div>
  );
} 