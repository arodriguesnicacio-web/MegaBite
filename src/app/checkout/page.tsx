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

  const [fulfillmentMethod, setFulfillmentMethod] = useState<'RETIRADA' | 'ENTREGA'>('RETIRADA');
  const [requestedDate, setRequestedDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Data mínima (hoje) no fuso brasileiro
  const todayString = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      router.push('/login?redirect=/checkout');
      return;
    }

    if (!requestedDate) {
      setErrorMessage('Por favor, selecione a data desejada para recebimento.');
      return;
    }

    if (fulfillmentMethod === 'ENTREGA' && !deliveryAddress.trim()) {
      setErrorMessage('Por favor, informe o endereço completo para a entrega.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const result = await createOrderAction({
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          sizeName: item.sizeName,
          price: item.price,
          quantity: item.quantity,
        })),
        fulfillmentMethod,
        requestedDate,
        deliveryAddress: fulfillmentMethod === 'ENTREGA' ? deliveryAddress : undefined,
        notes,
      });

      if (result.success) {
        clearCart();
        router.push('/checkout/sucesso');
      } else {
        setErrorMessage(result.error || 'Não foi possível registrar o seu pedido.');
      }
    } catch (err) {
      setErrorMessage('Erro de conexão ao processar o seu pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '16px' }}>Seu carrinho está vazio</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>Adicione produtos antes de finalizar o pedido.</p>
        <Link
          href="/produtos"
          style={{
            padding: '12px 24px',
            backgroundColor: '#6B3E2E',
            color: '#fff',
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
      <div style={{ maxWidth: '800px', margin: '60px auto', textAlign: 'center' }}>
        <p style={{ color: '#666', fontSize: '18px' }}>Carregando dados da sessão...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ color: '#6B3E2E', marginBottom: '24px' }}>Finalização do Pedido</h1>

      {errorMessage && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
          {errorMessage}
        </div>
      )}

      {/* Resumo dos Itens */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', margin: '0 0 16px', color: '#6B3E2E' }}>Resumo dos Produtos</h2>
        {items.map((item) => (
          <div key={`${item.productId}-${item.sizeName}`} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
            <div>
              <strong>{item.productName}</strong> ({item.sizeName}) x {item.quantity}
            </div>
            <div>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginTop: '12px' }}>
          <span>Total:</span>
          <span style={{ color: '#6B3E2E' }}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>

      {!session ? (
        <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeeba', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 12px', color: '#856404' }}>Identificação Necessária</h3>
          <p style={{ color: '#856404', marginBottom: '20px' }}>Faça login na sua conta para concluir a compra.</p>
          <Link href="/login?redirect=/checkout" style={{ padding: '12px 24px', backgroundColor: '#6B3E2E', color: '#ffffff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
            Entrar / Cadastrar
          </Link>
        </div>
      ) : (
        <form onSubmit={handleConfirmOrder} style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '18px', color: '#6B3E2E', marginBottom: '16px' }}>Opções de Recebimento</h2>

          {/* Modalidade */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <label style={{ flex: 1, padding: '12px', border: fulfillmentMethod === 'RETIRADA' ? '2px solid #6B3E2E' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="radio" name="fulfillment" checked={fulfillmentMethod === 'RETIRADA'} onChange={() => setFulfillmentMethod('RETIRADA')} />
              <div>
                <strong>🏪 Retirada no Local</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>Retire na confeitaria em Alegre-ES</div>
              </div>
            </label>

            <label style={{ flex: 1, padding: '12px', border: fulfillmentMethod === 'ENTREGA' ? '2px solid #6B3E2E' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="radio" name="fulfillment" checked={fulfillmentMethod === 'ENTREGA'} onChange={() => setFulfillmentMethod('ENTREGA')} />
              <div>
                <strong>🛵 Entrega em Domicílio</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>Receba no seu endereço</div>
              </div>
            </label>
          </div>

          {/* Data Desejada */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>
              {fulfillmentMethod === 'RETIRADA' ? 'Data desejada para retirada *' : 'Data desejada para entrega *'}
            </label>
            <input
              type="date"
              min={todayString}
              required
              value={requestedDate}
              onChange={(e) => setRequestedDate(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          {/* Endereço se for Entrega */}
          {fulfillmentMethod === 'ENTREGA' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>
                Endereço Completo de Entrega *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Rua, Número, Bairro, Ponto de Referência..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
          )}

          {/* Observações */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px', fontSize: '14px' }}>
              Observações do Pedido (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Escrever 'Parabéns Maria' no bolo"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Enviando Encomenda...' : 'Confirmar e Enviar Encomenda →'}
          </button>
        </form>
      )}
    </div>
  );
} 