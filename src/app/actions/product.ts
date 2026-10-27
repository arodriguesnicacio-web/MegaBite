'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const categoryId = formData.get('categoryId') as string;
  const priceInput = formData.get('price') as string;

  const price = parseFloat(priceInput);

  if (!name || isNaN(price) || !categoryId) {
    throw new Error('Nome, preço e categoria são obrigatórios.');
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      ingredients: '',
      allergens: '',
      packaging: '',
      categoryId,
      sizes: {
        create: {
          sizeName: 'Padrão',
          price: price,
        },
      },
    },
  });

  revalidatePath('/admin');
  revalidatePath('/produtos');
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const priceInput = formData.get('price') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const price = parseFloat(priceInput);

  if (!name || isNaN(price)) {
    throw new Error('Nome e preço são obrigatórios.');
  }

  const updateData: { name: string; description: string; imageUrl?: string } = {
    name,
    description,
  };

  if (imageUrl) {
    updateData.imageUrl = imageUrl;
  }

  await prisma.product.update({
    where: { id },
    data: updateData,
  });

  const defaultSize = await prisma.productSize.findFirst({
    where: { productId: id },
  });

  if (defaultSize) {
    await prisma.productSize.update({
      where: { id: defaultSize.id },
      data: { price },
    });
  } else {
    await prisma.productSize.create({
      data: {
        productId: id,
        sizeName: 'Padrão',
        price,
      },
    });
  }

  revalidatePath('/admin');
  revalidatePath('/produtos');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath('/admin');
  revalidatePath('/produtos');
} 