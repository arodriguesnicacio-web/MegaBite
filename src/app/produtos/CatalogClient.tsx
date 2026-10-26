"use client";

import { useState } from "react";
import ProductCard from "@/app/components/ProductCard";

interface ProductItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  slug: string;
}

interface CatalogClientProps {
  initialProducts: ProductItem[];
  categories: string[];
}

export default function CatalogClient({ initialProducts, categories }: CatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Barra de Pesquisa e Filtros */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "0.75rem",
            border: "1px solid #F0BFB3",
            borderRadius: "6px",
            backgroundColor: "#FDF6F0",
            color: "#6B3E2E"
          }}
        />

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                border: "1px solid #6B3E2E",
                backgroundColor: selectedCategory === cat ? "#6B3E2E" : "#FFFCF8",
                color: selectedCategory === cat ? "#FFFCF8" : "#6B3E2E",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Produtos */}
      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6B3E2E", opacity: 0.7, marginTop: "3rem" }}>
          Nenhum produto encontrado para a busca selecionada.
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}