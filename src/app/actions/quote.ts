"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createQuoteAction(formData: FormData) {
  try {
    const nome = formData.get("nome") as string;
    const telefone = formData.get("telefone") as string;
    const tipoEvento = formData.get("tipoEvento") as string;
    const numPessoas = formData.get("numPessoas") as string;
    const saborMassa = formData.get("saborMassa") as string;
    const saborRecheio = formData.get("saborRecheio") as string;
    const dataEntrega = formData.get("dataEntrega") as string;
    const observacoes = formData.get("observacoes") as string;

    if (!nome || !telefone || !dataEntrega) {
      return { success: false, error: "Preencha todos os campos obrigatórios." };
    }

    // Buscar ou garantir um usuário válido para associar o orçamento no banco
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Cliente Convidado",
          email: "cliente@megabite.com.br",
          role: "CLIENTE",
        },
      });
    }

    // Gravar na tabela quote_request do Neon
    await prisma.quoteRequest.create({
      data: {
        userId: user.id,
        productType: tipoEvento || "Bolo Personalizado",
        servings: parseInt(numPessoas, 10) || 10,
        desiredDate: new Date(dataEntrega),
        flavor: `Massa: ${saborMassa} / Recheio: ${saborRecheio}`,
        theme: observacoes || "Nenhum",
        restrictions: "Nenhuma",
        details: `Solicitado por ${nome} (${telefone})`,
        status: "SOLICITADO",
      },
    });

    revalidatePath("/orcamento");

    // Gerar URL do WhatsApp
    const mensagem = `*Novo Pedido de Encomenda - MegaBite*\n\n` +
      `*Nome:* ${nome}\n` +
      `*Telefone:* ${telefone}\n` +
      `*Evento:* ${tipoEvento}\n` +
      `*Nº de Convidados:* ${numPessoas} pessoas\n` +
      `*Massa:* ${saborMassa}\n` +
      `*Recheio:* ${saborRecheio}\n` +
      `*Data Pretendida:* ${dataEntrega}\n` +
      `*Observações:* ${observacoes || "Nenhuma"}`;

    const numeroWhatsApp = "5528999999999";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    return { success: true, urlWhatsApp };

  } catch (error) {
    console.error("Erro ao gravar orçamento:", error);
    return { success: false, error: "Ocorreu um erro interno ao salvar o pedido." };
  }
}