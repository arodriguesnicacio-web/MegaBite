"use client";

import { use } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return (
      <div style={{ maxWidth: "800px", margin: "4rem auto", textAlign: "center", padding: "0 1rem", color: "#6B3E2E" }}>
        <h2>Produto não encontrado!</h2>
        <p style={{ opacity: 0.8, margin: "1rem 0" }}>O produto que procura não existe ou foi removido.</p>
        <Link
          href="/produtos"
          style={{ padding: "0.5rem 1rem", backgroundColor: "#6B3E2E", color: "#FFFCF8", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}
        >
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FFFCF8", minHeight: "100vh", padding: "2rem 1rem", color: "#6B3E2E" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Link
          href="/produtos"
          style={{ color: "#6B3E2E", textDecoration: "none", fontWeight: "bold", display: "inline-block", marginBottom: "1.5rem" }}
        >
          ← Voltar ao Catálogo
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>
          {/* Imagem do Produto */}
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #F0BFB3" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Informações do Produto */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#B85C38", fontWeight: "bold", textTransform: "uppercase" }}>
              {product.category}
            </span>
            <h1 style={{ margin: 0, color: "#6B3E2E", fontSize: "2rem" }}>{product.name}</h1>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#6B3E2E", margin: 0 }}>
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>

            <p style={{ color: "#6B3E2E", opacity: 0.85, lineHeight: "1.6" }}>{product.description}</p>

            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #F0BFB3" }}>
              <button
                onClick={() => alert(`Adicionado ${product.name} ao pedido!`)}
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  backgroundColor: "#6B3E2E",
                  color: "#FFFCF8",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Fazer Encomenda / Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 