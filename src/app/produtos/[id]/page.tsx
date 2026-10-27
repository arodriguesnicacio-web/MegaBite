import React from 'react';
import ProductDetailsClient from './ProductDetailsClient';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  let productData = null;

  // Tentativa de busca no Banco de Dados com fallback para o mockData
  try {
    const dbProduct = (await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        sizes: true,
      },
    })) as any; // Fazemos o cast para 'any' para evitar incompatibilidade de tipos de imagens no Prisma local

    if (dbProduct) {
      productData = {
        id: dbProduct.id,
        name: dbProduct.name,
        description: dbProduct.description,
        image: dbProduct.image || dbProduct.imageUrl || '/placeholder-cake.png',
        category: dbProduct.category ? { name: dbProduct.category.name } : undefined,
        sizes: Array.isArray(dbProduct.sizes)
          ? dbProduct.sizes.map((s: any) => ({
              id: s.id,
              sizeName: s.sizeName,
              price: Number(s.price),
            }))
          : [],
      };
    }
  } catch (error) {
    // Se a base de dados estiver offline, captura o erro para usar os dados locais
  }

  // Fallback para o mock local se não encontrou no banco ou o banco falhou
  if (!productData) {
    const mock = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
    productData = {
      id: mock.id,
      name: mock.name,
      description: mock.description,
      image: mock.image,
      category: mock.category ? { name: mock.category.name } : undefined,
      sizes: mock.sizes.map((s) => ({
        id: s.id,
        sizeName: s.sizeName,
        price: Number(s.price),
      })),
    };
  }

  return <ProductDetailsClient product={productData} />;
} 