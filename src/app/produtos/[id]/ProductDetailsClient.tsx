'use client';

import { useCart } from '@/context/CartContext';

import React, { useState } from 'react';
import Link from 'next/link';

const { addItem } = useCart();

export interface ProductSizeOption {
  id: string;
  sizeName: string;
  price: number;
}

export interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    category?: {
      name: string;
    };
    sizes: ProductSizeOption[];
  };
}

export default function ProductDetailsClient({ product }: ProductDetailsProps) {
  // Inicializa com a primeira opção de tamanho disponível
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(
    product.sizes[0] || { id: 'default', sizeName: 'Padrão', price: 0 }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1) {
      setQuantity(newQty);
    }
  };

  const unitPrice = Number(selectedSize.price) || 0;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      sizeName: selectedSize.sizeName,
      price: Number(selectedSize.price),
      quantity: quantity,
      categoryName: product.category?.name,
    });
  
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Link 
        href="/" 
        style={{ 
          display: 'inline-block', 
          marginBottom: '20px', 
          color: '#8b4513', 
          textDecoration: 'none',
          fontWeight: 'bold' 
        }}
      >
        ← Voltar ao Catálogo
      </Link>

      {addedNotice && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb'
        }}>
          Item adicionado ao carrinho com sucesso!
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        {/* Imagem do Produto */}
        <div>
          <img 
            src={product.image || '/placeholder-cake.png'} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              height: '350px', 
              objectFit: 'cover', 
              borderRadius: '8px' 
            }} 
          />
        </div>

        {/* Detalhes do Produto */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {product.category && (
              <span style={{ 
                fontSize: '12px', 
                textTransform: 'uppercase', 
                letterSpacing: '1px', 
                color: '#888',
                fontWeight: 'bold'
              }}>
                {product.category.name}
              </span>
            )}
            <h1 style={{ margin: '8px 0 16px', color: '#333' }}>{product.name}</h1>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Seleção de Tamanho / Apresentação / Fatia */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                Selecione a Apresentação:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {product.sizes.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '6px',
                        border: isSelected ? '2px solid #8b4513' : '1px solid #ddd',
                        backgroundColor: isSelected ? '#fff8f0' : '#ffffff',
                        color: isSelected ? '#8b4513' : '#333',
                        fontWeight: isSelected ? 'bold' : 'normal',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {size.sizeName} — R$ {Number(size.price).toFixed(2).replace('.', ',')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seleção de Quantidade */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                Quantidade:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                    fontSize: '18px',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: '18px', fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f5f5f5',
                    fontSize: '18px',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Preço Total e Botão de Adicionar */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: '#666', fontSize: '16px' }}>Subtotal:</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b4513' }}>
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#8b4513',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 