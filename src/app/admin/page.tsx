import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/app/components/ProductForm';
import ProductListManager from '@/app/admin/ProductListManager';
import { updateOrderStatusAction } from '@/app/actions/order';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  // 1. Verifica se existe uma sessão ativa
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect('/login');
  }

  // 2. BLINDA A ROTA: Consulta o banco de dados para verificar se o utilizador é realmente ADMIN
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!dbUser || dbUser.role !== 'ADMIN') {
    redirect('/'); // Expulsa qualquer utilizador comum de volta para a home
  }

  // SERVER ACTION: Função para criar a categoria
  async function createCategoryAction(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    if (!name || name.trim() === '') return;
    
    try {
      await prisma.category.create({
        data: { name: name.trim() },
      });
      revalidatePath('/admin');
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
    }
  }

  let orders: any[] = [];
  let products: any[] = [];
  let categories: any[] = [];

  try {
    orders = await (prisma.order as any).findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        items: {
          include: { product: true },
        },
      },
    });
  } catch (err) {
    console.error('Erro ao carregar pedidos na administração:', err);
  }

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { sizes: true },
    });
  } catch (err) {
    console.error('Erro ao carregar produtos na administração:', err);
  }

  try {
    categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
    categories = [];
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* CABEÇALHO */}
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
            PAINEL ADMINISTRATIVO (BLOQUEADO PARA ADMINS)
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

      {/* GERIR CATEGORIAS */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '20px', color: '#333', margin: '0 0 8px' }}>🏷️ Gerir Categorias</h2>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px 0' }}>
          Crie as categorias (ex: Bolos, Doces, Kits) antes de adicionar os produtos.
        </p>

        <form action={createCategoryAction} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <input
            type="text"
            name="name"
            placeholder="Nome da nova categoria..."
            required
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#6B3E2E',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            + Adicionar Categoria
          </button>
        </form>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.length === 0 ? (
            <span style={{ fontSize: '13px', color: '#999' }}>Nenhuma categoria criada ainda.</span>
          ) : (
            categories.map((cat) => (
              <span
                key={cat.id}
                style={{
                  backgroundColor: '#f0e6e3',
                  color: '#6B3E2E',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {cat.name}
              </span>
            ))
          )}
        </div>
      </div>

      {/* PEDIDOS REALIZADOS */}
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
          Acompanhe e gerencie as solicitações feitas pelos clientes em tempo real.
        </p>

        {orders.length === 0 ? (
          <div style={{ border: '2px dashed #eee', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: '#888', margin: 0, fontWeight: 'bold' }}>Nenhum pedido realizado até ao momento.</p>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '4px' }}>
              Os novos pedidos recebidos aparecerão nesta seção assim que forem confirmados.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: '1px solid #eaeaea',
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ color: '#6B3E2E', fontSize: '16px' }}>
                    Pedido #{String(order.id).substring(0, 8)}
                  </strong>

                  <form
                    action={async (formData: FormData) => {
                      'use server';
                      const newStatus = formData.get('status') as string;
                      await updateOrderStatusAction(order.id, newStatus);
                    }}
                  >
                    <select
                      name="status"
                      defaultValue={order.status}
                      onChange={(e) => e.target.form?.requestSubmit()}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <option value="PENDING">Pendente</option>
                      <option value="CONFIRMED">Confirmado</option>
                      <option value="IN_PREPARATION">Em Preparação</option>
                      <option value="READY">Pronto para Envio/Retirada</option>
                      <option value="DELIVERED">Concluído</option>
                      <option value="CANCELLED">Cancelado</option>
                    </select>
                  </form>
                </div>

                <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>
                  <strong>Cliente:</strong> {order.user?.name || order.user?.email || 'Cliente Autenticado'} |{' '}
                  <strong>Modalidade:</strong> {order.fulfillmentMethod === 'ENTREGA' ? '🛵 Entrega' : '🏪 Retirada'} |{' '}
                  <strong>Data Solicitada:</strong>{' '}
                  {order.requestedDate
                    ? new Date(order.requestedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                    : 'Não informada'}
                </div>

                {order.deliveryAddress && (
                  <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>
                    <strong>Endereço de Entrega:</strong> {order.deliveryAddress}
                  </div>
                )}

                {order.items && order.items.length > 0 && (
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#444',
                      marginBottom: '8px',
                      backgroundColor: '#ffffff',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #f0f0f0',
                    }}
                  >
                    <strong>Itens: </strong>
                    {order.items.map((item: any, idx: number) => (
                      <span key={item.id || idx}>
                        {item.quantity}x {item.product?.name || 'Produto'} ({item.sizeName})
                        {idx < order.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745', textAlign: 'right' }}>
                  Total: R$ {Number(order.total || 0).toFixed(2).replace('.', ',')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADICIONAR PRODUTOS & CATÁLOGO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
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
          <ProductForm categories={categories} />
        </div>

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

          <ProductListManager products={products} />
        </div>
      </div>
    </div>
  );
}