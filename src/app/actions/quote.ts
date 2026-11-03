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

    const textoObservacoes = `Massa: ${saborMassa} / Recheio: ${saborRecheio} | Obs: ${observacoes || "Nenhuma"}`;

    // Tenta guardar na base de dados de forma segura (se o modelo existir no Prisma)
    try {
      let user = await prisma.user.findFirst();
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: "Cliente Convidado",
            email: "cliente@megabite.com.br",
            role: "CLIENTE",
            emailVerified: true,
          },
        });
      }

      // Verificação de segurança para evitar crash caso o modelo QuoteRequest não esteja no schema
      if (prisma.quoteRequest && typeof (prisma.quoteRequest as any).create === "function") {
        const dataObj = dataEntrega ? new Date(dataEntrega) : new Date();
        await (prisma.quoteRequest as any).create({
          data: {
            userId: user.id,
            nomeCliente: nome,
            telefone: telefone,
            tipoProduto: tipoEvento || "Bolo Personalizado",
            quantidadePessoas: parseInt(numPessoas, 10) || 10,
            dataDesejada: isNaN(dataObj.getTime()) ? new Date() : dataObj,
            tema: observacoes || "Nenhum",
            observacoes: textoObservacoes,
          },
        });
      }
    } catch (dbError) {
      console.warn("Aviso na persistência do orçamento (continuando para o WhatsApp):", dbError);
    }

    revalidatePath("/orcamento");

    // Gerar URL do WhatsApp com a mensagem formatada
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

  } catch (error: any) {
    console.error("ERRO AO PROCESSAR ORÇAMENTO:", error);
    return { success: false, error: `Erro ao processar pedido: ${error?.message || "Erro desconhecido"}` };
  }
}