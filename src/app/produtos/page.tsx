import React from 'react';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/app/components/ProductCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProdutosPage() {
  let products: any[] = [];
  
  try {
    // É crucial fazer o include do 'sizes', caso contrário o preço vai aparecer como R$ 0,00 e o botão não vai funcionar
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { sizes: true }, 
    });
  } catch (err) {
    console.error('Erro ao carregar produtos do catálogo:', err);
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ color: '#6B3E2E', marginBottom: '8px', textAlign: 'center', fontSize: '32px' }}>
        Nosso Catálogo
      </h1>
      <p style={{ color: '#666', marginBottom: '40px', textAlign: 'center', fontSize: '16px' }}>
        Explore e escolha as melhores opções artesanais para adoçar o seu dia.
      </p>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
          Nenhum produto disponível no momento.
        </div>
      ) : (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'stretch' // Garante que todos os cartões na mesma linha tenham a mesma altura
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