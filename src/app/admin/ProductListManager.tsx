import React from 'react';
import { toggleProductAvailabilityAction, deleteProductAction } from '@/app/actions/product';

interface ProductListManagerProps {
  products: any[];
}

export default function ProductListManager({ products }: ProductListManagerProps) {
  if (!products || products.length === 0) {
    return <p style={{ color: '#888', fontSize: '14px' }}>Nenhum produto cadastrado no catálogo.</p>;
  }

  return (
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
            <span
              style={{
                fontSize: '12px',
                color: product.isAvailable ? '#28a745' : '#dc3545',
                fontWeight: 'bold',
              }}
            >
              {product.isAvailable ? '● Disponível' : '● ESGOTADO'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <form
              action={async (formData: FormData) => {
                'use server';
                await toggleProductAvailabilityAction(product.id, !product.isAvailable);
              }}
            >
              <button
                type="submit"
                style={{
                  padding: '6px 10px',
                  backgroundColor: product.isAvailable ? '#dc3545' : '#28a745',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              >
                {product.isAvailable ? 'Esgotado' : 'Disponibilizar'}
              </button>
            </form>

            <form
              action={async (formData: FormData) => {
                'use server';
                await deleteProductAction(product.id);
              }}
            >
              <button
                type="submit"
                style={{
                  padding: '6px 10px',
                  backgroundColor: '#6c757d',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              >
                Excluir
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
} 