'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    category?: string;
    imageUrl?: string;
    price?: number;
    isAvailable?: boolean;
    sizes?: { id: string; name: string; price: number }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart() as any;
  const isEsgotado = product.isAvailable === false;

  const mainSize = (product.sizes && product.sizes.length > 0)
    ? product.sizes[0]
    : { name: 'Padrão', price: product.price || 0 };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que ao clicar no botão o cliente seja redirecionado para a página de detalhes
    addToCart({
      productId: product.id,
      productName: product.name,
      sizeName: mainSize.name,
      price: mainSize.price,
      quantity: 1,
    });
    alert(`"${product.name}" foi adicionado ao carrinho!`);
  };

  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '12px',
        padding: '16px',
        backgroundColor: '#ffffff',
        position: 'relative',
        opacity: isEsgotado ? 0.65 : 1,
        filter: isEsgotado ? 'grayscale(30%)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '400px', // Garante que o cartão tem sempre espaço suficiente
      }}
    >
      {isEsgotado && (
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#dc3545',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '11px',
            padding: '4px 8px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            zIndex: 2,
          }}
        >
          ESGOTADO
        </span>
      )}

      {/* ÁREA CLICÁVEL (DIRECIONA PARA OS DETALHES DO PRODUTO) */}
      <Link href={`/produtos/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '12px',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '180px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
            Sem imagem
          </div>
        )}

        <h3 style={{ margin: '0 0 6px', color: '#333', fontSize: '18px' }}>{product.name}</h3>
        
        <p 
          style={{ 
            color: '#666', 
            fontSize: '13px', 
            margin: '0 0 12px',
            /* ESTAS 4 LINHAS IMPEDEM QUE O TEXTO EMPURRE O BOTÃO PARA FORA */
            display: '-webkit-box',
            WebkitLineClamp: 3, 
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </p>
      </Link>

      {/* PREÇO E BOTÃO DO CARRINHO (ANCOrados SEMPRE AO FUNDO) */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee' }}>
        <span style={{ fontWeight: 'bold', color: '#6B3E2E', fontSize: '16px' }}>
          R$ {Number(mainSize.price).toFixed(2).replace('.', ',')}
        </span>

        <button
          type="button"
          disabled={isEsgotado}
          onClick={handleAddToCart}
          style={{
            padding: '8px 14px',
            backgroundColor: isEsgotado ? '#6c757d' : '#6B3E2E',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: isEsgotado ? 'not-allowed' : 'pointer',
            fontSize: '13px',
          }}
        >
          {isEsgotado ? 'Esgotado' : 'Adicionar +'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard; 