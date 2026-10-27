import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/app/components/ProductForm';
import { ProductListManager } from './ProductListManager';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  // Busca lista de produtos
  const productsRaw = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      sizes: true,
    },
  });

  const products = productsRaw.map((p) => ({
    ...p,
    sizes: p.sizes.map((s) => ({
      ...s,
      price: Number(s.price),
    })),
  }));

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  // Busca lista de pedidos (ou consulta segura caso a tabela ainda não esteja alimentada)
  let orders: any[] = [];
  try {
    // @ts-ignore
    if (prisma.order) {
      // @ts-ignore
      orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    }
  } catch (e) {
    orders = [];
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fffbf7', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
      <main style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Cabeçalho */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #f3e8e2', borderRadius: '12px', padding: '1.25rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(139, 69, 19, 0.04)' }}>
          <div>
            <span style={{ display: 'inline-block', backgroundColor: '#fdf0ed', color: '#e07a5f', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              Painel Administrativo
            </span>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#2b2d42', fontWeight: 800 }}>Gestão MegaBite</h1>
            <p style={{ margin: '0.2rem 0 0 0', color: '#7d7d7d', fontSize: '0.85rem' }}>
              Bem-vindo(a) de volta, <strong>{session.user.name}</strong>!
            </p>
          </div>
          <div style={{ backgroundColor: '#fdf0ed', border: '1px solid #f8d7da', padding: '0.4rem 1rem', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '0.65rem', color: '#e07a5f', fontWeight: 700, textTransform: 'uppercase' }}>Total Produtos</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#8b4513' }}>{products.length}</span>
          </div>
        </div>

        {/* TOP PRIORIDADE: Painel de Pedidos Realizados */}
        <section style={{ backgroundColor: '#ffffff', border: '1px solid #f3e8e2', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(139, 69, 19, 0.04)' }}>
          <div style={{ borderBottom: '1px solid #f3e8e2', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#2b2d42' }}>📦 Pedidos Realizados</h2>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: '#7d7d7d' }}>
                Acompanhe e gerencie as solicitações feitas pelos clientes
              </p>
            </div>
            <span style={{ backgroundColor: '#fdf0ed', color: '#8b4513', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '8px' }}>
              {orders.length} pedidos
            </span>
          </div>

          {orders.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: '#7d7d7d', backgroundColor: '#fffbf7', borderRadius: '8px', border: '1px dashed #f3e8e2' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Nenhum pedido realizado até ao momento.</p>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem', display: 'block' }}>
                Os novos pedidos recebidos aparecerão nesta seção em tempo real.
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {orders.map((order) => (
                <div key={order.id} style={{ padding: '1rem', border: '1px solid #f3e8e2', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fffbf7' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#2b2d42' }}>Pedido #{order.id.slice(-6)}</h4>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#7d7d7d' }}>Cliente: {order.userName || 'Cliente'}</p>
                  </div>
                  <span style={{ fontWeight: 800, color: '#8b4513', fontSize: '0.9rem' }}>
                    R$ {Number(order.total || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PARTE INFERIOR: Grid Lado a Lado no PC (auto-fit) e Empilhado no Telemóvel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* Formulário de Cadastro */}
          <section style={{ backgroundColor: '#ffffff', border: '1px solid #f3e8e2', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(139, 69, 19, 0.04)' }}>
            <div style={{ borderBottom: '1px solid #f3e8e2', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#2b2d42' }}>Adicionar Novo Produto</h2>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: '#7d7d7d' }}>Preencha para publicar no catálogo</p>
            </div>
            <ProductForm categories={categories} />
          </section>

          {/* Catálogo de Produtos com Botão de Edição + Troca de Imagem */}
          <section style={{ backgroundColor: '#ffffff', border: '1px solid #f3e8e2', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(139, 69, 19, 0.04)' }}>
            <div style={{ borderBottom: '1px solid #f3e8e2', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#2b2d42' }}>Catálogo de Produtos</h2>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: '#7d7d7d' }}>
                Itens cadastrados ({products.length})
              </p>
            </div>

            {products.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#7d7d7d', fontSize: '0.875rem' }}>
                Nenhum produto cadastrado até ao momento.
              </div>
            ) : (
              <ProductListManager products={products} />
            )}
          </section>

        </div>

      </main>
    </div>
  );
} 