'use client';

import React, { useState } from 'react';
import { toggleProductAvailabilityAction, deleteProductAction, updateProduct } from '@/app/actions/product';

interface ProductListManagerProps {
  products: any[];
}

export default function ProductListManager({ products }: ProductListManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

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
            flexDirection: 'column',
            gap: '8px',
            backgroundColor: editingId === product.id ? '#fdfdfd' : '#fff'
          }}
        >
          {editingId === product.id ? (
            // ================= MODO DE EDIÇÃO =================
            <form
              action={async (formData: FormData) => {
                await updateProduct(product.id, formData);
                setEditingId(null); // Fecha a edição após salvar
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <input type="text" name="name" defaultValue={product.name} placeholder="Nome do Produto" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} required />
              <input type="text" name="description" defaultValue={product.description} placeholder="Descrição" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input type="text" name="imageUrl" defaultValue={product.imageUrl} placeholder="URL da Imagem do Blob" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button type="submit" style={{ padding: '6px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Alterações</button>
                <button type="button" onClick={() => setEditingId(null)} style={{ padding: '6px 12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
              </div>
            </form>
          ) : (
            // ================= MODO DE VISUALIZAÇÃO =================
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                
                {/* RESTAURAÇÃO DA MINIATURA DA IMAGEM NA ADMINISTRAÇÃO */}
                {product.imageUrl ? (
                   <img src={product.imageUrl} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                ) : (
                   <div style={{ width: '40px', height: '40px', backgroundColor: '#eee', borderRadius: '4px', border: '1px solid #ddd' }}></div>
                )}
                
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
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* BOTÃO EDITAR */}
                <button
                  type="button"
                  onClick={() => setEditingId(product.id)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#ffc107',
                    color: '#212529',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                >
                  Editar
                </button>

                {/* BOTÃO ESGOTAR */}
                <form action={async (formData: FormData) => { await toggleProductAvailabilityAction(product.id, !product.isAvailable); }}>
                  <button type="submit" style={{ padding: '6px 10px', backgroundColor: product.isAvailable ? '#dc3545' : '#28a745', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                    {product.isAvailable ? 'Esgotar' : 'Disponibilizar'}
                  </button>
                </form>

                {/* BOTÃO EXCLUIR DEFINITIVO COM ALERTA */}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if(window.confirm('Tem a certeza que deseja excluir DEFINITIVAMENTE este produto do banco de dados?')) {
                        const result = await deleteProductAction(product.id);
                        if(result && !result.success) { alert(result.error); }
                    }
                  }}
                >
                  <button type="submit" style={{ padding: '6px 10px', backgroundColor: '#6c757d', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 