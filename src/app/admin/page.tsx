import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/app/components/ProductForm';
import { ProductCard } from '@/app/components/ProductCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  let orders: any[] = [];
  let products: any[] = [];

  try {
    orders = await (prisma.order as any).findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
  } catch (err) {
    console.error('Erro ao buscar pedidos no admin:', err);
  }

  try {
    products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sizes: true,
      },
    });
  } catch (err) {
    console.error('Erro ao buscar produtos no admin:', err);
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      {/* Cabeçalho Principal do Painel */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
            }}
          >
            PAINEL ADMINISTRATIVO
          </span>
          <h1 style={{ color: '#6B3E2E', margin: '12px 0 4px', fontSize: '28px' }}>Gestão MegaBite</h1>
          <p style={{ color: '#666', margin: 0 }}>
            Bem-vindo(a) de volta, <strong>Projeto Megabite</strong>!
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
          <span style={{ fontSize: '11px', color: '#6B3E2E', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Total Produtos
          </span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6B3E2E' }}>
            {products.length}
          </div>
        </div>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '20px', color: '#333', margin: 0 }}>📦 Pedidos Realizados</h2>
          <span
            style={{
              backgroundColor: '#fff5f2',
              color: '#6B3E2E',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
          </span>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px 0' }}>
          Acompanhe e gerencie as solicitações feitas pelos clientes
        </p>

        {orders.length === 0 ? (
          <div style={{ border: '2px dashed #eee', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: '#888', margin: 0, fontWeight: 'bold' }}>Nenhum pedido realizado até ao momento.</p>
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

      {/* Grade Inferior: Adicionar Novo Produto + Catálogo Existente */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Formulário para Adicionar Novo Produto */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ fontSize: '18px', color: '#333', margin: '0 0 4px' }}>Adicionar Novo Produto</h2>
          <p style={{ color: '#666', fontSize: '13px', margin: '0 0 20px' }}>
            Preencha para publicar no catálogo
          </p>
          <ProductForm />
        </div>

        {/* Lista e Gestão do Catálogo de Produtos */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', color: '#333', margin: 0 }}>Catálogo de Produtos</h2>
            <span style={{ fontSize: '13px', color: '#666' }}>Itens cadastrados ({products.length})</span>
          </div>

          {products.length === 0 ? (
            <p style={{ color: '#888', fontSize: '14px' }}>Nenhum produto cadastrado no catálogo.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <strong style={{ color: '#333', display: 'block', fontSize: '15px' }}>{product.name}</strong>
                    <span style={{ fontSize: '12px', color: '#777' }}>
                      {product.category || 'Geral'}
                    </span>
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 