import React from 'react';
import { prisma } from '@/lib/prisma';

// Desativa o cache estático do Next.js nesta página para atualizar os pedidos em tempo real
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  let orders: any[] = [];
  let productsCount = 0;

  try {
    // Busca os pedidos ordenados por data de criação do mais recente ao mais antigo
    orders = await (prisma.order as any).findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
  } catch (err) {
    console.error('Erro ao buscar pedidos no painel de administração:', err);
  }

  try {
    productsCount = await prisma.product.count();
  } catch (err) {
    productsCount = 10;
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      {/* Cabeçalho do Painel */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: '#856404',
            backgroundColor: '#fff3cd',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          PAINEL ADMINISTRATIVO
        </span>
        <h1 style={{ color: '#6B3E2E', margin: '12px 0 4px', fontSize: '28px' }}>Gestão MegaBite</h1>
        <p style={{ color: '#666', margin: 0 }}>Acompanhe os pedidos recebidos e gerencie o catálogo.</p>
      </div>

      {/* Seção de Pedidos Realizados */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', color: '#333', margin: 0 }}>📦 Pedidos Realizados</h2>
          <span
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #ddd',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
          </span>
        </div>

        {orders.length === 0 ? (
          <div style={{ border: '2px dashed #eee', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: '#888', margin: 0 }}>Nenhum pedido realizado até ao momento.</p>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '4px' }}>
              Os novos pedidos recebidos aparecerão nesta seção em tempo real.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: '1px solid #eaeaea',
                  padding: '16px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#fafafa',
                }}
              >
                <div>
                  <strong style={{ color: '#6B3E2E', display: 'block' }}>
                    Pedido #{String(order.id).substring(0, 8)}
                  </strong>
                  <span style={{ fontSize: '14px', color: '#555' }}>
                    Cliente: {order.user?.name || order.user?.email || 'Cliente Autenticado'}
                  </span>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                    Data: {new Date(order.createdAt || Date.now()).toLocaleString('pt-BR')}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
                    R$ {Number(order.total || 0).toFixed(2).replace('.', ',')}
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '4px',
                      padding: '2px 8px',
                      backgroundColor: order.status === 'PENDING' ? '#fff3cd' : '#d4edda',
                      color: order.status === 'PENDING' ? '#856404' : '#155724',
                      fontSize: '12px',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                    }}
                  >
                    {order.status === 'PENDING' ? 'Pendente' : order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}  