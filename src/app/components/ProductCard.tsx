'use client';

import React from 'react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    price?: number;
    category?: string;
    imageUrl?: string;
  };
  onEdit?: (product: any) => void;
  onDelete?: (id: string) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <span
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#6B3E2E',
          backgroundColor: '#fff5f2',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        {product.price ? `R$ ${Number(product.price).toFixed(2).replace('.', ',')}` : 'Ativo'}
      </span>
    </div>
  );
}

// Exportação padrão e nomeada juntas para evitar erros de importação
export default ProductCard; 