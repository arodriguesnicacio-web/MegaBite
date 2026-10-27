import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function MyOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect('/login?redirect=/meus-pedidos');
  }

  let orders: any[] = [];
  try {
    orders = await (prisma.order as any).findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } catch (err) {
    console.error('Erro ao carregar os meus pedidos:', err);
  }

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; bg: string; color: string }> = {
      PENDING: { label: 'Pendente', bg: '#fff3cd', color: '#856404' },
      CONFIRMED: { label: 'Confirmado', bg: '#cce5ff', color: '#004085' },
      IN_PREPARATION: { label: 'Em Preparação', bg: '#e2e3e5', color: '#383d41' },
      READY: { label: 'Pronto para Retirada/Envio', bg: '#d4edda', color: '#155724' },
      DELIVERED: { label: 'Concluído', bg: '#d1e7dd', color: '#0f5132' },
      CANCELLED: { label: 'Cancelado', bg: '#f8d7da', color: '#721c24' },
    };

    const current = config[status] || { label: status, bg: '#eee', color: '#333' };
    return (
      <span style={{ backgroundColor: current.bg, color: current.color, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
        {current.label}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#6B3E2E', marginBottom: '8px' }}>Meus Pedidos</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Acompanhe as suas encomendas artesanais no MegaBite</p>

      {orders.length === 0 ? (
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>Você ainda não realizou nenhum pedido conosco.</p>
          <Link href="/produtos" style={{ padding: '12px 24px', backgroundColor: '#6B3E2E', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Explorar o Catálogo
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <strong style={{ fontSize: '16px', color: '#6B3E2E' }}>Pedido #{String(order.id).substring(0, 8)}</strong>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                    Realizado em: {new Date(order.createdAt).toLocaleString('pt-BR')}
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>

              {/* Informações de Entrega/Retirada */}
              <div style={{ backgroundColor: '#fff5f2', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', color: '#6B3E2E' }}>
                <div>
                  <strong>Modalidade:</strong> {order.fulfillmentMethod === 'ENTREGA' ? '🛵 Entrega em Domicílio' : '🏪 Retirada na Confeitaria'}
                </div>
                <div>
                  <strong>Data Solicitada:</strong> {new Date(order.requestedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </div>
                {order.deliveryAddress && (
                  <div style={{ marginTop: '4px' }}>
                    <strong>Endereço:</strong> {order.deliveryAddress}
                  </div>
                )}
                {order.notes && (
                  <div style={{ marginTop: '4px' }}>
                    <strong>Observações:</strong> {order.notes}
                  </div>
                )}
              </div>

              {/* Lista de Itens */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {order.items?.map((item: any) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>
                      {item.product?.name || 'Produto'} ({item.sizeName}) x {item.quantity}
                    </span>
                    <strong>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '12px', fontWeight: 'bold', fontSize: '16px' }}>
                <span>Total:</span>
                <span style={{ color: '#6B3E2E' }}>R$ {Number(order.total).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 