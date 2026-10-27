'use client';

import { useState, useRef } from 'react';
import { updateProduct, deleteProduct } from '@/app/actions/product';
import { uploadImageAction } from '@/app/actions/upload';

interface ProductItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  sizes: Array<{ price: number }>;
}

export function ProductListManager({ products }: { products: ProductItem[] }) {
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleEditImageUpload = async () => {
    const file = editFileInputRef.current?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadedUrl = await uploadImageAction(formData);
      setNewImageUrl(uploadedUrl);
    } catch (error) {
      console.error('Erro ao enviar nova imagem:', error);
      alert('Falha ao enviar a nova imagem do produto.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    if (newImageUrl) {
      formData.set('imageUrl', newImageUrl);
    }

    try {
      await updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
      setNewImageUrl('');
      alert('Produto atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar produto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid #f3e8e2',
    backgroundColor: '#fffbf7',
    fontSize: '0.9rem',
    color: '#2b2d42',
    boxSizing: 'border-box',
    outline: 'none',
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {products.map((product) => {
          const displayPrice = product.sizes[0]?.price
            ? product.sizes[0].price.toFixed(2)
            : '0.00';

          return (
            <div
              key={product.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                backgroundColor: '#fffbf7',
                borderRadius: '8px',
                border: '1px solid #f3e8e2',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f3e8e2' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: '#fdf0ed',
                      border: '1px solid #f8d7da',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      color: '#e07a5f',
                      fontWeight: 700,
                    }}
                  >
                    Sem foto
                  </div>
                )}
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#2b2d42' }}>{product.name}</h4>
                  <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.75rem', color: '#7d7d7d' }}>
                    {product.description || 'Sem descrição'}
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '0.2rem', fontSize: '0.85rem', fontWeight: 800, color: '#8b4513' }}>
                    R$ {displayPrice}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(product);
                    setNewImageUrl('');
                  }}
                  style={{
                    padding: '0.35rem 0.75rem',
                    backgroundColor: '#ffffff',
                    border: '1px solid #f3e8e2',
                    color: '#8b4513',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>

                <form action={deleteProduct.bind(null, product.id)}>
                  <button
                    type="submit"
                    style={{
                      padding: '0.35rem 0.75rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#d9534f',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Edição com troca de foto */}
      {editingProduct && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              maxWidth: '480px',
              width: '100%',
              padding: '1.5rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div style={{ borderBottom: '1px solid #f3e8e2', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#2b2d42' }}>Editar Produto</h2>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#7d7d7d' }}>Atualize as informações de {editingProduct.name}</p>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#2b2d42', marginBottom: '0.35rem' }}>
                  Nome do Produto
                </label>
                <input type="text" name="name" defaultValue={editingProduct.name} required style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#2b2d42', marginBottom: '0.35rem' }}>
                  Descrição
                </label>
                <textarea name="description" defaultValue={editingProduct.description} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#2b2d42', marginBottom: '0.35rem' }}>
                  Preço Base (R$)
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  defaultValue={editingProduct.sizes[0]?.price ? editingProduct.sizes[0].price : ''}
                  required
                  style={inputStyle}
                />
              </div>

              {/* Seção da Imagem no Modal */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#2b2d42', marginBottom: '0.35rem' }}>
                  Trocar Imagem do Produto
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <img
                    src={newImageUrl || editingProduct.imageUrl || ''}
                    alt="Preview"
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #f3e8e2',
                      backgroundColor: '#fffbf7',
                    }}
                  />
                  <label
                    style={{
                      display: 'inline-block',
                      padding: '0.55rem 1rem',
                      backgroundColor: '#fdf0ed',
                      color: '#e07a5f',
                      border: '1px dashed #e07a5f',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {isUploading ? 'Enviando...' : '📷 Alterar Imagem'}
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={handleEditImageUpload}
                      accept="image/*"
                      disabled={isUploading}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                {newImageUrl && (
                  <span style={{ display: 'block', marginTop: '0.35rem', fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                    ✓ Nova imagem selecionada
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setNewImageUrl('');
                  }}
                  style={{ padding: '0.5rem 1rem', border: '1px solid #f3e8e2', backgroundColor: '#ffffff', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', color: '#7d7d7d' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: '#8b4513', color: '#ffffff', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 