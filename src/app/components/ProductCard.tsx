'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    category?: string;
    imageUrl?: string;
    isAvailable?: boolean;
    sizes?: { id: string; name: string; price: number }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart() as any;
  const isEsgotado = product.isAvailable === false;
  const mainSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;

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
        justifyContent: 'space-between',
      }}
    >
      {/* Badge Visível de Esgotado */}
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
          }}
        >
          ESGOTADO
        </span>
      )}

      <div>
        <h3 style={{ margin: '0 0 6px', color: '#333', fontSize: '18px' }}>{product.name}</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '0 0 12px', minHeight: '36px' }}>{product.description}</p>
      </div>

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', color: '#6B3E2E', fontSize: '16px' }}>
          {mainSize ? `R$ ${mainSize.price.toFixed(2).replace('.', ',')}` : 'Sob Consulta'}
        </span>

        <button
          type="button"
          disabled={isEsgotado || !mainSize}
          onClick={() => {
            if (mainSize) {
              addToCart({
                productId: product.id,
                productName: product.name,
                sizeName: mainSize.name,
                price: mainSize.price,
                quantity: 1,
              });
            }
          }}
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