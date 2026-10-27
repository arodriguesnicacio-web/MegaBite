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
  requestedDate: string; // YYYY-MM-DD
  deliveryAddress?: string;
  notes?: string;
}

export async function createOrderAction(payload: CreateOrderPayload) {
  try {
    // 1. Validação estrita da sessão do usuário
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, error: 'Sessão expirada. Faça login novamente.' };
    }

    if (!payload.items || payload.items.length === 0) {
      return { success: false, error: 'O seu carrinho está vazio.' };
    }

    // 2. Validação no Servidor: Verificar se algum produto está ESGOTADO
    const productIds = payload.items.map((i) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    for (const item of payload.items) {
      const found = dbProducts.find((p) => p.id === item.productId);
      if (found && found.isAvailable === false) {
        return {
          success: false,
          error: `O produto "${found.name}" encontra-se ESGOTADO e não pode ser encomendado.`,
        };
      }
    }

    // 3. Validação de Data (Fuso Horário do Brasil)
    const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' }); // 'YYYY-MM-DD'
    if (payload.requestedDate < todayStr) {
      return { success: false, error: 'A data desejada não pode ser anterior à data de hoje.' };
    }

    if (payload.fulfillmentMethod === 'ENTREGA' && !payload.deliveryAddress?.trim()) {
      return { success: false, error: 'Por favor, informe o endereço completo para entrega.' };
    }

    // 4. Recálculo e verificação de preços no servidor
    const calculatedTotal = payload.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 5. Gravação da Encomenda no Banco de Dados
    const newOrder = await (prisma.order as any).create({
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

    revalidatePath('/admin');
    revalidatePath('/meus-pedidos');

    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return { success: false, error: 'Erro ao processar o pedido no banco de dados.' };
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

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    return { success: false, error: 'Falha ao atualizar o status do pedido.' };
  }
} 