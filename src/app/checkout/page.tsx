'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { authClient } from '@/lib/auth-client';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  
  // Obtenção da sessão de autenticação em tempo real via Better Auth
  const { data: session, isPending } = authClient.useSession();

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '16px' }}>Nenhum item selecionado</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          O seu carrinho está vazio. Adicione um bolo ou doce antes de prosseguir com o pedido.
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
          Ir para o Catálogo
        </Link>
      </div>
    );
  }

  if (isPending) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#666', fontSize: '18px' }}>Carregando dados da sessão...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '24px' }}>Finalização do Pedido</h1>

      {/* Resumo dos Itens do Carrinho */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '18px', margin: '0 0 16px', color: '#8b4513' }}>Resumo dos Itens</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee',
                paddingBottom: '8px',
              }}
            >
              <div>
                <strong>{item.productName}</strong> ({item.sizeName}) x {item.quantity}
              </div>
              <div>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span style={{ color: '#8b4513' }}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      {/* Verificação da Autenticação do Usuário */}
      {!session ? (
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeeba',
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 12px', color: '#856404' }}>Identificação Necessária</h3>
          <p style={{ color: '#856404', marginBottom: '20px' }}>
            Para concluir a sua encomenda e garantir a entrega, precisa de entrar na sua conta ou criar um cadastro.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link
              href="/login"
              style={{
                padding: '12px 24px',
                backgroundColor: '#8b4513',
                color: '#ffffff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Entrar / Cadastrar
            </Link>
            <Link
              href="/carrinho"
              style={{
                padding: '12px 24px',
                backgroundColor: '#ffffff',
                color: '#333',
                border: '1px solid #ccc',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Voltar ao Carrinho
            </Link>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'right',
          }}
        >
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <p style={{ margin: '0 0 8px', color: '#333', fontWeight: 'bold' }}>
              Cliente autenticado: {session.user.name || session.user.email}
            </p>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              Endereço de e-mail: {session.user.email}
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert('Pedido enviado com sucesso!')}
            style={{
              padding: '14px 28px',
              backgroundColor: '#28a745',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Confirmar e Enviar Encomenda →
          </button>
        </div>
      )}
    </div>
  );
} 