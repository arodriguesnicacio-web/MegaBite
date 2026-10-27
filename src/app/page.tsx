import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/app/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Buscar os produtos do banco de dados para os destaques (exatamente 3 cards)
  
 <div
            style={{
              backgroundColor: '#f8c8dc',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              width: '100%',
              height: '350px',
              boxShadow: '0 8px 24px rgba(139, 69, 19, 0.08)',
            }}
          >
             <img
              src="https://i.pinimg.com/1200x/67/07/49/670749dd5a07df6f9964602ffb0b72db.jpg"
              alt="Bolos e Doces Artesanais MegaBite"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            /> 
          </div> 
  const produtosDoBanco = await prisma.product.findMany({
    include: {
      category: true,
      sizes: true,
    },
    orderBy: { createdAt: "desc" },
    take: 3, // Exibe 3 produtos em destaque
  });

  const featuredProducts = produtosDoBanco.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category.name,
    price: p.sizes.length > 0 ? Number(p.sizes[0].price) : 0,
    image: p.imageUrl || "https://i.pinimg.com/1200x/67/07/49/670749dd5a07df6f9964602ffb0b72db.jpg",
    slug: p.id,
  }));

  const especialidades = [
    { nome: "Bolos", icone: "🎂" },
    { nome: "Cupcakes", icone: "🧁" },
    { nome: "Brownies", icone: "🍫" },
    { nome: "Tortas", icone: "🥧" },
    { nome: "Doces", icone: "🍬" },
    { nome: "Kits Festa", icone: "🎁" },
  ];

  return (
    <div style={{ backgroundColor: "#FFFCF8", color: "#6B3E2E", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* 1. HERO SECTION */}
      <section style={{ backgroundColor: "#FDF6F0", padding: "3.5rem 2rem", borderBottom: "1px solid #F0BFB3" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
          
          {/* Coluna de Texto (Esquerda) */}
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "bold", letterSpacing: "1px", color: "#B85C38", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
              Sabor & Tradição Artesanal
            </span>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: "1.2", color: "#6B3E2E", marginBottom: "1rem" }}>
              Momentos inesquecíveis pedem doces extraordinários.
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#6B3E2E", opacity: 0.85, lineHeight: "1.5", marginBottom: "2rem" }}>
              Bolos recheados, brownies crocantes, cupcakes decorados e kits exclusivos preparados diariamente com ingredientes nobres.
            </p>
            
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/produtos"
                style={{
                  padding: "0.85rem 1.75rem",
                  backgroundColor: "#6B3E2E",
                  color: "#FFFCF8",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                Ver Catálogo
              </Link>
              <Link
                href="/orcamento"
                style={{
                  padding: "0.85rem 1.75rem",
                  backgroundColor: "#FFFCF8",
                  color: "#6B3E2E",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  textDecoration: "none",
                  border: "1.5px solid #6B3E2E",
                  fontSize: "0.95rem",
                }}
              >
                Encomenda Especial
              </Link>
            </div>
          </div>

          {/* Coluna do Card Visual (Direita) */}
          <div style={{
            backgroundColor: "#F4C2C2",
            borderRadius: "16px",
            height: "280px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(107, 62, 46, 0.05)"
          }}>
              <img
              src="https://i.pinimg.com/1200x/67/07/49/670749dd5a07df6f9964602ffb0b72db.jpg"
              alt="Bolos e Doces Artesanais MegaBite 🎂"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

        </div>
      </section>

      {/* 2. SEÇÃO NOSSAS ESPECIALIDADES */}
      <section style={{ maxWidth: "1100px", margin: "3.5rem auto", padding: "0 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.85rem", fontWeight: "bold", color: "#6B3E2E", marginBottom: "0.25rem" }}>
          Nossas Especialidades
        </h2>
        <p style={{ color: "#6B3E2E", opacity: 0.8, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
          Feito à mão para adoçar o seu dia
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.25rem", justifyContent: "center" }}>
          {especialidades.map((item) => (
            <Link
              key={item.nome}
              href="/produtos"
              style={{
                backgroundColor: "#FFFCF8",
                border: "1px solid #F0BFB3",
                borderRadius: "12px",
                padding: "1.5rem 1rem",
                textAlign: "center",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              <span style={{ fontSize: "2.5rem" }}>{item.icone}</span>
              <span style={{ fontWeight: "bold", color: "#6B3E2E", fontSize: "0.95rem" }}>{item.nome}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SEÇÃO MAIS PEDIDOS DA SEMANA */}
      <section style={{ maxWidth: "1100px", margin: "3.5rem auto", padding: "0 1.5rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.85rem", fontWeight: "bold", color: "#6B3E2E", marginBottom: "0.25rem" }}>
          Mais Pedidos da Semana
        </h2>
        <p style={{ textAlign: "center", color: "#6B3E2E", opacity: 0.8, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
          Confira algumas das delícias artesanais mais amadas pelos nossos clientes.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            href="/produtos"
            style={{ color: "#6B3E2E", fontWeight: "bold", textDecoration: "underline", fontSize: "1rem" }}
          >
            Ver todos os produtos do catálogo →
          </Link> 
        </div>
      </section>

      {/* 4. SEÇÃO POR QUE ESCOLHER A MEGABITE? */}
      <section style={{ backgroundColor: "#FDF6F0", padding: "3.5rem 1.5rem", borderTop: "1px solid #F0BFB3", borderBottom: "1px solid #F0BFB3" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.85rem", fontWeight: "bold", color: "#6B3E2E", marginBottom: "2rem" }}>
            Por que escolher a MegaBite?
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            <div style={{ padding: "1.75rem 1.5rem", background: "#FFFCF8", borderRadius: "12px", border: "1px solid #F0BFB3" }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>🍰</span>
              <h3 style={{ margin: "0.5rem 0", color: "#6B3E2E", fontSize: "1.1rem" }}>Produção 100% Artesanal</h3>
              <p style={{ color: "#6B3E2E", opacity: 0.8, fontSize: "0.875rem", margin: 0, lineHeight: "1.4" }}>
                Receitas exclusivas preparadas com carinho e sem conservantes artificiais.
              </p>
            </div>

            <div style={{ padding: "1.75rem 1.5rem", background: "#FFFCF8", borderRadius: "12px", border: "1px solid #F0BFB3" }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>🌿</span>
              <h3 style={{ margin: "0.5rem 0", color: "#6B3E2E", fontSize: "1.1rem" }}>Ingredientes Selecionados</h3>
              <p style={{ color: "#6B3E2E", opacity: 0.8, fontSize: "0.875rem", margin: 0, lineHeight: "1.4" }}>
                Chocolates nobres e frutas frescas selecionadas diariamente.
              </p>
            </div>

            <div style={{ padding: "1.75rem 1.5rem", background: "#FFFCF8", borderRadius: "12px", border: "1px solid #F0BFB3" }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>🚀</span>
              <h3 style={{ margin: "0.5rem 0", color: "#6B3E2E", fontSize: "1.1rem" }}>Entrega Sob Agendamento</h3>
              <p style={{ color: "#6B3E2E", opacity: 0.8, fontSize: "0.875rem", margin: 0, lineHeight: "1.4" }}>
                Garantia de produtos frescos e pontualidade na entrega do seu evento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}