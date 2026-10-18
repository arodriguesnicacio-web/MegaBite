import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div style={{ border: "1px solid #F0BFB3", borderRadius: "8px", overflow: "hidden", background: "#FFFCF8", display: "flex", flexDirection: "column" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <span style={{ fontSize: "0.8rem", color: "#B85C38", fontWeight: "bold", textTransform: "uppercase" }}>
          {product.category}
        </span>
        <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem", color: "#6B3E2E" }}>{product.name}</h3>
        <p style={{ fontSize: "0.875rem", color: "#6B3E2E", opacity: 0.8, flexGrow: 1, marginBottom: "1rem" }}>
          {product.description}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#6B3E2E" }}>
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <Link
            href={`/produtos/${product.id}`}
            style={{ padding: "0.5rem 1rem", backgroundColor: "#6B3E2E", color: "#FFFCF8", borderRadius: "6px", textDecoration: "none", fontSize: "0.875rem", fontWeight: "bold" }}
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
} 