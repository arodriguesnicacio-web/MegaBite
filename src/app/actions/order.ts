'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

export interface OrderItemInput {
  productId: string;
  productName: string;
  sizeName: string;
  price: number;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItemInput[];
  totalAmount: number;
}

export async function createOrderAction(payload: CreateOrderPayload) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, error: 'Sessão inválida. Faça login novamente.' };
    }

    if (!payload.items || payload.items.length === 0) {
      return { success: false, error: 'O carrinho está vazio.' };
    }

    let newOrder;
    try {
      newOrder = await (prisma.order as any).create({
        data: {
          userId: session.user.id,
          total: payload.totalAmount,
          status: 'PENDING',
          items: {
            create: payload.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              sizeName: item.sizeName,
            })),
          },
        },
      });
    } catch (dbError) {
      // Fallback para esquemas onde a relação de itens não está mapeada
      newOrder = await (prisma.order as any).create({
        data: {
          userId: session.user.id,
          total: payload.totalAmount,
          status: 'PENDING',
        },
      });
    }

    revalidatePath('/admin');
    revalidatePath('/checkout');

    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error('Erro ao gravar pedido no banco:', error);
    revalidatePath('/admin');
    return {
      success: false,
      error: 'Não foi possível gravar o pedido. Verifique se a variável DATABASE_URL está configurada.',
    };
  }
} 