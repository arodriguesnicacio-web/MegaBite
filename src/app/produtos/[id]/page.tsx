"use client";

import { use } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Desembrulhar os parâmetros assíncronos no Next.js 15+
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return (
      <div style={{ maxWidth: "800px", margin: "4rem auto", textAlign: "center", padding: "0 1rem" }}>
        <h2>Produto não encontrado!</h2>
        <p style={{ color: "#6b7280", margin: "1rem 0" }}>O produto que procura não existe ou foi removido.</p>
        <Link
          href="/produtos"
          style={{ padding: "0.5rem 1rem", backgroundColor: "#106d41", color: "#fff", borderRadius: "4px", textDecoration: "none" }}
        >
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 1rem" }}>
      <Link
        href="/produtos"
        style={{ color: "#106d41", textDecoration: "none", fontWeight: "bold", display: "inline-block", marginBottom: "1.5rem" }}
      >
        ← Voltar ao Catálogo
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>
        {/* Imagem do Produto */}
        <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e7eb" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Informações do Produto */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#106d41", fontWeight: "bold", textTransform: "uppercase" }}>
            {product.category}
          </span>
          <h1 style={{ margin: 0, color: "#1f2937", fontSize: "2rem" }}>{product.name}</h1>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#111827", margin: 0 }}>
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>

          <p style={{ color: "#4b5563", lineHeight: "1.6" }}>{product.description}</p>

          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
            <button
              onClick={() => alert(`Adicionado ${product.name} ao pedido!`)}
              style={{
                width: "100%",
                padding: "0.875rem",
                backgroundColor: "#106d41",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
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
  );
} 