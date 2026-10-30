import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/app/components/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProdutosPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function ProdutosPage({ searchParams }: ProdutosPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.categoria;

  let products: any[] = [];
  let categories: any[] = [];

  // 1. Busca todas as categorias para preencher os botões de filtro
  try {
    categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
  }

  // 2. Busca os produtos aplicando o filtro de categoria se houver uma selecionada
  try {
    products = await prisma.product.findMany({
      where: selectedCategory ? { categoryId: selectedCategory } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { 
        sizes: true,
        category: true, // Inclui a relação para exibir os dados da categoria no card se necessário
      }, 
    });
  } catch (err) {
    console.error('Erro ao carregar produtos do catálogo:', err);
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#6B3E2E', marginBottom: '8px', textAlign: 'center', fontSize: '32px' }}>
        Nosso Catálogo
      </h1>
      <p style={{ color: '#666', marginBottom: '30px', textAlign: 'center', fontSize: '16px' }}>
        Explore e escolha as melhores opções artesanais para adoçar o seu dia.
      </p>

      {/* BARRA DE FILTROS POR CATEGORIA */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          flexWrap: 'wrap', 
          marginBottom: '40px' 
        }}
      >
        <Link
          href="/produtos"
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: !selectedCategory ? '#6B3E2E' : '#f5e6e0',
            color: !selectedCategory ? '#ffffff' : '#6B3E2E',
            border: '1px solid #6B3E2E',
            transition: 'all 0.2s',
          }}
        >
          Todos
        </Link>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <Link
              key={cat.id}
              href={`/produtos?categoria=${cat.id}`}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                backgroundColor: isSelected ? '#6B3E2E' : '#f5e6e0',
                color: isSelected ? '#ffffff' : '#6B3E2E',
                border: '1px solid #6B3E2E',
                transition: 'all 0.2s',
              }}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* LISTAGEM DE PRODUTOS */}
      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
          Nenhum produto disponível nesta categoria no momento.
        </div>
      ) : (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'stretch'
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}