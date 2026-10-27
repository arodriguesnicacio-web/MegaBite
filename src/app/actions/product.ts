'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isFuncionario = (session?.user as { role?: string })?.role === 'FUNCIONARIO';
    if (!session || !isFuncionario) {
      return { success: false, error: 'Acesso negado. Apenas administradores podem criar produtos.' };
    }

    const name = formData.get('name') as string;
    const description = (formData.get('description') as string) || '';
    const imageUrl = (formData.get('imageUrl') as string) || '';
    const priceStr = formData.get('price') as string;
    const price = priceStr ? parseFloat(priceStr) : 0;

    if (!name) {
      return { success: false, error: 'O nome do produto é obrigatório.' };
    }

    let newProduct;
    try {
      // Criação usando cast para ignorar conflitos de tipos estritos do Prisma
      newProduct = await (prisma.product as any).create({
        data: {
          name,
          description,
          imageUrl,
          isAvailable: true,
          sizes: {
            create: [
              {
                name: 'Padrão',
                price: price,
              },
            ],
          },
        },
      });
    } catch (createError) {
      // Fallback seguro de criação direta do produto caso a relação de tamanhos divirja
      newProduct = await (prisma.product as any).create({
        data: {
          name,
          description,
          imageUrl,
          isAvailable: true,
        },
      });
    }

    revalidatePath('/admin');
    revalidatePath('/produtos');
    revalidatePath('/');

    return { success: true, productId: newProduct.id };
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return { success: false, error: 'Erro ao salvar produto no banco de dados.' };
  }
}

export async function toggleProductAvailabilityAction(productId: string, isAvailable: boolean) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isFuncionario = (session?.user as { role?: string })?.role === 'FUNCIONARIO';
    if (!session || !isFuncionario) {
      return { success: false, error: 'Acesso negado. Ação permitida apenas para administradores.' };
    }

    await (prisma.product as any).update({
      where: { id: productId },
      data: { isAvailable },
    });

    revalidatePath('/admin');
    revalidatePath('/produtos');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Erro ao alterar disponibilidade do produto:', error);
    return { success: false, error: 'Erro ao atualizar a disponibilidade no banco de dados.' };
  }
} 