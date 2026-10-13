"use client";

import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/app/components/ProductCard";

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Todos", "Bolos de Festa", "Doces Tradicionais", "Salgados"];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "0.5rem", color: "#1f2937" }}>Nosso Catálogo Artesanal</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem" }}>
        Escolha as suas delícias favoritas feitas sob encomenda.
      </p>

      {/* Barra de Pesquisa e Filtros */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", maxWidth: "400px", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px" }}
        />

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                border: "1px solid #106d41",
                backgroundColor: selectedCategory === cat ? "#106d41" : "#fff",
                color: selectedCategory === cat ? "#fff" : "#106d41",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Produtos */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#9ca3af", marginTop: "3rem" }}>
          Nenhum produto encontrado para a busca selecionada.
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 