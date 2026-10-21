import { prisma } from "@/lib/prisma";
import CatalogClient from "@/app/produtos/CatalogClient";

export const dynamic = "force-dynamic";

export default async function ProdutosPage() {
  // 1. Buscar todos os produtos do banco de dados Neon com Prisma (sem filtro restrictivo)
  const produtosDoBanco = await prisma.product.findMany({
    include: {
      category: true,
      sizes: true,
    },
    orderBy: { createdAt: "desc" },
  });

  console.log("PRODUTOS ENCONTRADOS NO BANCO:", produtosDoBanco.length);
  // 2. Buscar categorias reais do banco
  const categoriasDoBanco = await prisma.category.findMany();

  // Mapear os produtos incluindo o 'slug' e a 'imageUrl' correta
  const productsFormatted = produtosDoBanco.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category.name,
    price: p.sizes.length > 0 ? Number(p.sizes[0].price) : 0,
    image: p.imageUrl || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60",
    slug: p.id,
  }));

  const categoriesList = ["Todos", ...categoriasDoBanco.map((c) => c.name)];

  return (
    <div style={{ backgroundColor: "#FFFCF8", color: "#6B3E2E", minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "0.5rem", color: "#6B3E2E" }}>Nosso Catálogo Artesanal</h1>
        <p style={{ textAlign: "center", color: "#6B3E2E", opacity: 0.8, marginBottom: "2rem" }}>
          Escolha as suas delícias favoritas feitas sob encomenda.
        </p>

        <CatalogClient initialProducts={productsFormatted} categories={categoriesList} />
      </div>
    </div>
  );
}