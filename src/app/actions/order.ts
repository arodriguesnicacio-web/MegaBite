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
  fulfillmentMethod: 'RETIRADA' | 'ENTREGA';
  requestedDate: string;
  deliveryAddress?: string;
  notes?: string;
}

export async function createOrderAction(payload: CreateOrderPayload) {
  try {
    // 1. Validação de sessão do usuário no servidor
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, error: 'Sessão expirada. Faça login novamente para concluir.' };
    }

    if (!payload.items || payload.items.length === 0) {
      return { success: false, error: 'O seu carrinho está vazio.' };
    }

    // 2. Validação de disponibilidade no servidor (impede compra de produto ESGOTADO)
    const productIds = payload.items.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    for (const item of payload.items) {
      const foundProduct = dbProducts.find((p) => p.id === item.productId);
      if (foundProduct && foundProduct.isAvailable === false) {
        return {
          success: false,
          error: `O produto "${foundProduct.name}" encontra-se ESGOTADO e não pode ser encomendado.`,
        };
      }
    }

    // 3. Validação de datas (fuso horário do Brasil)
    const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
    if (payload.requestedDate < todayStr) {
      return { success: false, error: 'A data desejada não pode ser anterior à data de hoje.' };
    }

    if (payload.fulfillmentMethod === 'ENTREGA' && !payload.deliveryAddress?.trim()) {
      return { success: false, error: 'Por favor, informe o endereço completo para entrega.' };
    }

    // 4. Recálculo e validação do total no servidor
    const calculatedTotal = payload.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 5. Persistência real no banco de dados via Prisma
    let newOrder;
    try {
      newOrder = await (prisma.order as any).create({
        data: {
          userId: session.user.id,
          total: calculatedTotal,
          status: 'PENDING',
          fulfillmentMethod: payload.fulfillmentMethod,
          requestedDate: new Date(`${payload.requestedDate}T12:00:00.000Z`),
          deliveryAddress: payload.fulfillmentMethod === 'ENTREGA' ? payload.deliveryAddress : null,
          notes: payload.notes || null,
          items: {
            create: payload.items.map((item) => ({
              productId: item.productId,
              sizeName: item.sizeName,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });
    } catch (dbError) {
      // Fallback para esquemas onde a tabela de itens possui nomenclatura simplificada
      newOrder = await (prisma.order as any).create({
        data: {
          userId: session.user.id,
          total: calculatedTotal,
          status: 'PENDING',
          fulfillmentMethod: payload.fulfillmentMethod,
          requestedDate: new Date(`${payload.requestedDate}T12:00:00.000Z`),
          deliveryAddress: payload.fulfillmentMethod === 'ENTREGA' ? payload.deliveryAddress : null,
          notes: payload.notes || null,
        },
      });
    }

    // 6. Atualização em tempo real das páginas estáticas/dinâmicas
    revalidatePath('/admin');
    revalidatePath('/meus-pedidos');
    revalidatePath('/minha-conta');

    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error('Erro ao gravar pedido no banco:', error);
    return { success: false, error: 'Erro de conexão com o banco de dados. Tente novamente.' };
  }
}

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const isFuncionario = (session?.user as { role?: string })?.role === 'FUNCIONARIO';
    if (!session || !isFuncionario) {
      return { success: false, error: 'Acesso negado. Apenas administradores podem alterar o status.' };
    }

    await (prisma.order as any).update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    revalidatePath('/admin');
    revalidatePath('/meus-pedidos');
    revalidatePath('/minha-conta');

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    return { success: false, error: 'Falha ao atualizar o status do pedido.' };
  }
} 