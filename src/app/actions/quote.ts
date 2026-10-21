"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createQuoteAction(formData: FormData) {
  try {
    // 1. Extrair os dados correspondentes ao seu schema real
    const userId = formData.get("userId") as string; // ID do usuário logado
    const productType = formData.get("productType") as string;
    const servingsStr = formData.get("servings") as string;
    const desiredDateStr = formData.get("desiredDate") as string;
    const flavor = formData.get("flavor") as string;
    const theme = formData.get("theme") as string;
    const restrictions = formData.get("restrictions") as string;
    const details = formData.get("details") as string;

    // 2. Validação básica de campos obrigatórios
    if (!userId || !productType || !servingsStr || !desiredDateStr || !flavor) {
      return { success: false, error: "Preencha todos os campos obrigatórios do orçamento." };
    }

    // 3. Gravar na base de dados Neon com o Prisma
    const newQuote = await prisma.quoteRequest.create({
      data: {
        userId,
        productType,
        servings: parseInt(servingsStr, 10),
        desiredDate: new Date(desiredDateStr),
        flavor,
        theme: theme || null,
        restrictions: restrictions || null,
        details: details || "",
        status: "SOLICITADO",
      },
    });

    revalidatePath("/orcamento");

    return { 
      success: true, 
      data: newQuote,
      message: "Solicitação de orçamento registada com sucesso!" 
    };

  } catch (error) {
    console.error("Erro ao gravar orçamento:", error);
    return { success: false, error: "Ocorreu um erro interno ao salvar o orçamento." };
  }
}