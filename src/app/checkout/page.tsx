'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useSession } from '@/lib/auth-client';
import { createOrderAction } from '@/app/actions/order';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirmOrder = async () => {
    if (!session) {
      router.push('/login?redirect=/checkout');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const result = await createOrderAction({
        items: items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          sizeName: item.sizeName,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: subtotal,
      });

      if (result.success) {
        clearCart();
        // Redireciona para a página de sucesso após finalizar
        router.push('/checkout/sucesso');
      } else {
        setErrorMessage(result.error || 'Não foi possível concluir o pedido.');
      }
    } catch (err) {
      setErrorMessage('Ocorreu um erro ao conectar com o servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '16px' }}>Seu carrinho está vazio</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Adicione doces ou bolos do nosso catálogo para prosseguir com o pedido.
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
          Ir para o Catálogo
        </Link>
      </div>
    );
  }

  if (isPending) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#666', fontSize: '18px' }}>Carregando dados do utilizador...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '24px' }}>Finalização da Compra</h1>

      {errorMessage && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
          {errorMessage}
        </div>
      )}

      {/* Resumo dos Itens */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '18px', margin: '0 0 16px', color: '#6B3E2E' }}>Resumo do Pedido</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.sizeName}`}
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
          <span style={{ color: '#6B3E2E' }}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      {/* Verificação da Conta do Cliente */}
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
            Faça login na sua conta para concluir a sua compra com segurança.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link
              href="/login?redirect=/checkout"
              style={{
                padding: '12px 24px',
                backgroundColor: '#6B3E2E',
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
              Cliente: {session.user.name || session.user.email}
            </p>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              Confirmação será enviada para: {session.user.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            style={{
              padding: '14px 28px',
              backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Processando Encomenda...' : 'Confirmar e Enviar Encomenda →'}
          </button>
        </div>
      )}
    </div>
  );
} 