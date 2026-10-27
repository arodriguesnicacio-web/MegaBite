import React from 'react';
import ProductDetailsClient from './ProductDetailsClient';
import { MOCK_PRODUCTS } from '@/lib/mockData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  let productData = null;

  // Tentativa segura de busca no Banco de Dados
  // Só executa o Prisma se a variável de ambiente DATABASE_URL existir no servidor
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import('@/lib/prisma');
      const dbProduct = (await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
          sizes: true,
        },
      })) as any;

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
      console.error('Erro ao buscar produto no banco:', error);
    }
  }

  // Fallback para os dados locais de teste se o produto não estiver no banco ou o banco não responder
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