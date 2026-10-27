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

export async function updateProduct(idOrFormData: string | FormData, formDataParam?: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isFuncionario = (session?.user as { role?: string })?.role === 'FUNCIONARIO';
    if (!session || !isFuncionario) {
      return { success: false, error: 'Acesso negado. Apenas administradores podem atualizar produtos.' };
    }

    let productId: string = '';
    let formData: FormData;

    if (typeof idOrFormData === 'string') {
      productId = idOrFormData;
      formData = formDataParam || new FormData();
    } else {
      formData = idOrFormData;
      productId = (formData.get('id') as string) || '';
    }

    const name = (formData.get('name') as string) || undefined;
    const description = (formData.get('description') as string) || undefined;
    const imageUrl = (formData.get('imageUrl') as string) || undefined;
    const priceStr = formData.get('price') as string;
    const price = priceStr ? parseFloat(priceStr) : undefined;

    await (prisma.product as any).update({
      where: { id: productId },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
    });

    revalidatePath('/admin');
    revalidatePath('/produtos');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return { success: false, error: 'Erro ao atualizar produto no banco de dados.' };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isFuncionario = (session?.user as { role?: string })?.role === 'FUNCIONARIO';
    if (!session || !isFuncionario) {
      return { success: false, error: 'Acesso negado. Apenas administradores podem excluir produtos.' };
    }

    await (prisma.product as any).update({
      where: { id: productId },
      data: { isAvailable: false },
    });

    revalidatePath('/admin');
    revalidatePath('/produtos');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return { success: false, error: 'Não foi possível excluir o produto.' };
  }
}

export const deleteProductAction = deleteProduct;

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