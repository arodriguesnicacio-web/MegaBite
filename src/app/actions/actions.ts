"use server";

import { prisma } from "@/lib/prisma"; // Se o seu ficheiro em src/lib se chamar db.ts, mude para "@/lib/db"
import { revalidatePath } from "next/cache";

// Tipo para os status permitidos no orçamentador
export type StatusOrcamento = "SOLICITADO" | "EM_ANALISE" | "APROVADO" | "RECUSADO";

export async function updateQuoteStatusAction(
  quoteId: string,
  newStatus: StatusOrcamento
) {
  try {
    // Atualiza o status do orçamento na tabela quote_request
    await prisma.quoteRequest.update({
      where: { id: quoteId },
      data: { status: newStatus },
    });

    // Revalida a cache da página do admin para atualizar instantaneamente
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar status do orçamento:", error);
    return { success: false, error: "Erro ao atualizar o status." };
  }
}