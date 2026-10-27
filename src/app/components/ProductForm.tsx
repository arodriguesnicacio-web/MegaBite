'use client';

import { useState, useRef } from 'react';
import { createProduct } from '@/app/actions/product';
import { uploadImageAction } from '@/app/actions/upload';

interface Category {
  id: string;
  name: string;
}

export function ProductForm({ categories }: { categories: Category[] }) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadedUrl = await uploadImageAction(formData);
      setImageUrl(uploadedUrl);
    } catch (error) {
      console.error('Erro ao enviar imagem do produto:', error);
      alert('Falha ao enviar a imagem do produto.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set('imageUrl', imageUrl);

    try {
      await createProduct(formData);
      
      // Limpa o formulário usando formRef ao invés de e.currentTarget
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setImageUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      alert('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar produto.');
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

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#2b2d42',
    marginBottom: '0.35rem',
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={labelStyle}>Nome do Produto</label>
        <input
          type="text"
          name="name"
          required
          style={inputStyle}
          placeholder="Ex: Torta Especial de Morango"
        />
      </div>

      <div>
        <label style={labelStyle}>Categoria</label>
        <select name="categoryId" required style={inputStyle}>
          <option value="">Selecione uma categoria...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Descrição</label>
        <textarea
          name="description"
          rows={3}
          required
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Descreva o sabor, ingredientes e detalhes artesanais..."
        />
      </div>

      <div>
        <label style={labelStyle}>Preço Base (R$)</label>
        <input
          type="number"
          name="price"
          step="0.01"
          required
          style={inputStyle}
          placeholder="45.00"
        />
      </div>

      <div>
        <label style={labelStyle}>Imagem do Produto (Vercel Blob)</label>
        <div style={{ marginTop: '0.25rem' }}>
          <label
            style={{
              display: 'inline-block',
              padding: '0.65rem 1.25rem',
              backgroundColor: '#fdf0ed',
              color: '#e07a5f',
              border: '1px dashed #e07a5f',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {isUploading ? 'Enviando...' : '📁 Selecionar Imagem'}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              disabled={isUploading}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {imageUrl && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem', padding: '0.5rem', backgroundColor: '#fffbf7', borderRadius: '8px', border: '1px solid #f3e8e2' }}>
            <img src={imageUrl} alt="Preview" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>✓ Imagem guardada no Blob</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isUploading}
        style={{
          width: '100%',
          padding: '0.75rem 1.25rem',
          backgroundColor: '#8b4513',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.9rem',
          border: 'none',
          borderRadius: '8px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          marginTop: '0.5rem',
        }}
      >
        {isSubmitting ? 'Salvando produto...' : 'Cadastrar Produto'}
      </button>
    </form>
  );
} 