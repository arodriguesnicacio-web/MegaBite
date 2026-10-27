import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import LogoutButton from './LogoutButton';

export const dynamic = 'force-dynamic';

export default async function MinhaContaPage() {
  // 1. Verificação segura de sessão no servidor
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect('/login?redirect=/minha-conta');
  }

  // 2. Busca estrita dos pedidos vinculados EXCLUSIVAMENTE ao usuário autenticado
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
    console.error('Erro ao carregar pedidos na página Minha Conta:', err);
  }

  // Mapeamento visual dos badges de status
  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; bg: string; color: string }> = {
      PENDING: { label: 'Pendente', bg: '#fff3cd', color: '#856404' },
      CONFIRMED: { label: 'Confirmado', bg: '#cce5ff', color: '#004085' },
      IN_PREPARATION: { label: 'Em Preparação', bg: '#e2e3e5', color: '#383d41' },
      READY: { label: 'Pronto', bg: '#d4edda', color: '#155724' },
      DELIVERED: { label: 'Concluído', bg: '#d1e7dd', color: '#0f5132' },
      CANCELLED: { label: 'Cancelado', bg: '#f8d7da', color: '#721c24' },
    };

    const current = config[status] || { label: status, bg: '#eee', color: '#333' };
    return (
      <span
        style={{
          backgroundColor: current.bg,
          color: current.color,
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        {current.label}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      {/* Bloco de Informações da Conta */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '12px',
              color: '#856404',
              backgroundColor: '#fff3cd',
              padding: '4px 8px',
              borderRadius: '4px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            PERFIL DO CLIENTE
          </span>
          <h1 style={{ color: '#6B3E2E', margin: '10px 0 4px', fontSize: '26px' }}>
            Minha Conta
          </h1>
          <p style={{ color: '#555', margin: '0 0 2px', fontSize: '15px' }}>
            <strong>Nome:</strong> {session.user.name || 'Não informado'}
          </p>
          <p style={{ color: '#555', margin: 0, fontSize: '15px' }}>
            <strong>E-mail:</strong> {session.user.email}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#fff5f2',
            border: '1px solid #ffe3dc',
            padding: '12px 20px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#6B3E2E', fontWeight: 'bold' }}>
            TOTAL DE ENCOMENDAS
          </span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6B3E2E' }}>
            {orders.length}
          </div>
        </div>
      </div>

      {/* Seção da Tabela de Pedidos */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '20px', color: '#333', margin: '0 0 4px' }}>
              Acompanhe seus pedidos
            </h2>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
              Histórico completo das suas solicitações realizadas no MegaBite
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              border: '2px dashed #eee',
              padding: '40px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#666', fontSize: '16px', margin: '0 0 16px' }}>
              Você ainda não realizou nenhum pedido.
            </p>
            <Link
              href="/produtos"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#6B3E2E',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Explorar o Catálogo →
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '14px',
                minWidth: '680px',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#fafafa', borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '12px', color: '#6B3E2E' }}>Data</th>
                  <th style={{ padding: '12px', color: '#6B3E2E' }}>Produtos</th>
                  <th style={{ padding: '12px', color: '#6B3E2E' }}>Valor</th>
                  <th style={{ padding: '12px', color: '#6B3E2E' }}>Processamento</th>
                  <th style={{ padding: '12px', color: '#6B3E2E' }}>Recebimento</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const formattedDate = new Date(order.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });

                  const formattedRequestedDate = order.requestedDate
                    ? new Date(order.requestedDate).toLocaleDateString('pt-BR', {
                        timeZone: 'UTC',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                    : 'Não informado';

                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                      {/* Coluna Data */}
                      <td style={{ padding: '12px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        <strong>{formattedDate}</strong>
                        <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                          #{String(order.id).substring(0, 8)}
                        </div>
                      </td>

                      {/* Coluna Produtos */}
                      <td style={{ padding: '12px', verticalAlign: 'top' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item: any) => (
                              <div key={item.id} style={{ color: '#333' }}>
                                • <strong>{item.quantity}x</strong> {item.product?.name || 'Produto'}
                                {item.sizeName ? ` (${item.sizeName})` : ''}
                              </div>
                            ))
                          ) : (
                            <span style={{ color: '#888' }}>Itens não especificados</span>
                          )}
                        </div>
                        {order.notes && (
                          <div style={{ fontSize: '12px', color: '#856404', marginTop: '6px', backgroundColor: '#fff3cd', padding: '4px 8px', borderRadius: '4px' }}>
                            Obs: {order.notes}
                          </div>
                        )}
                      </td>

                      {/* Coluna Valor */}
                      <td style={{ padding: '12px', verticalAlign: 'top', fontWeight: 'bold', color: '#6B3E2E', whiteSpace: 'nowrap' }}>
                        R$ {Number(order.total || 0).toFixed(2).replace('.', ',')}
                      </td>

                      {/* Coluna Processamento (Status) */}
                      <td style={{ padding: '12px', verticalAlign: 'top' }}>
                        {getStatusBadge(order.status)}
                      </td>

                      {/* Coluna Recebimento */}
                      <td style={{ padding: '12px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 'bold', color: '#333' }}>
                          {order.fulfillmentMethod === 'ENTREGA' ? '🛵 Entrega' : order.fulfillmentMethod === 'RETIRADA' ? '🏪 Retirada' : 'Não informado'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                          Data: {formattedRequestedDate}
                        </div>
                        {order.deliveryAddress && (
                          <div style={{ fontSize: '11px', color: '#777', marginTop: '2px', maxWidth: '200px' }}>
                            {order.deliveryAddress}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Seção Inferior com Botão Sair da Conta */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: '#333' }}>
            Encerrar Sessão
          </h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
            Deseja sair da sua conta neste dispositivo?
          </p>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
} 