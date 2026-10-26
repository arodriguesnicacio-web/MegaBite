import Link from "next/link";

export default function SobreNosPage() {
  return (
    <div
      style={{
        backgroundColor: "#FFFCF8",
        color: "#6B3E2E",
        minHeight: "100vh",
        padding: "2.5rem 1rem",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Link para voltar ao Início */}
        <Link
          href="/"
          style={{
            color: "#6B3E2E",
            textDecoration: "none",
            fontWeight: "bold",
            display: "inline-block",
            marginBottom: "1.5rem",
            fontSize: "0.95rem",
          }}
        >
          ← Voltar ao Início
        </Link>

        {/* Título Principal */}
        <h1
          style={{
            textAlign: "center",
            color: "#6B3E2E",
            fontSize: "2.5rem",
            marginBottom: "3rem",
            fontWeight: "bold",
          }}
        >
          Sobre a MegaBite
        </h1>

        {/* Container Principal em Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            alignItems: "center",
            background: "#FDF6F0",
            padding: "3rem 2rem",
            borderRadius: "20px",
            border: "1px solid #F0BFB3",
            boxShadow: "0 10px 30px rgba(107, 62, 46, 0.04)",
          }}
        >
          {/* Lado Esquerdo: Imagens e Formas Orgânicas */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            
            {/* Fundo decorativo em tom rosa suave (#F0BFB3) */}
            <div
              style={{
                position: "absolute",
                width: "320px",
                height: "320px",
                backgroundColor: "#F0BFB3",
                borderRadius: "50% 40% 60% 50%",
                opacity: 0.6,
                zIndex: 1,
              }}
            />

            {/* Foto Principal das Fundadoras */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "6px solid #FFFCF8",
                boxShadow: "0 8px 20px rgba(107, 62, 46, 0.15)",
              }}
            >
              <img
                src="/fundadoras.jpeg"
                alt="Fundadoras da MegaBite"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Badge Circular Sobreposta (Selo com a Logo) */}
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "15px",
                zIndex: 3,
                width: "110px",
                height: "110px",
                backgroundColor: "#FFFCF8",
                borderRadius: "50%",
                border: "4px solid #F0BFB3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(107, 62, 46, 0.2)",
                overflow: "hidden",
              }}
            >
              <img
                src="/Logo MegaBite Confeitaria com Batedor.png"
                alt="Selo MegaBite"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Lado Direito: Textos Institucionais */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Bloco 1: Sobre a Gente */}
            <div>
              <h2 style={{ color: "#6B3E2E", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
                Sobre a Gente
              </h2>
              <p style={{ color: "#6B3E2E", opacity: 0.85, lineHeight: "1.6", fontSize: "0.95rem" }}>
                Duas amigas unidas pela paixão de criar e pelo desejo de empreender. Trazemos não apenas habilidades técnicas, mas uma dedicação artesanal para cada detalhe. Nossa missão é colocar amor e sabor em tudo o que fazemos, buscando sempre a excelência e o toque pessoal que fazem a MegaBite única. Somos uma dupla dinâmica, movida por sonhos e pelo prazer de servir.
              </p>
            </div>

            {/* Bloco 2: Nosso Propósito */}
            <div>
              <h2 style={{ color: "#6B3E2E", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
                Nosso Propósito
              </h2>
              <p style={{ color: "#6B3E2E", opacity: 0.85, lineHeight: "1.6", fontSize: "0.95rem" }}>
                Proporcionar experiências incríveis e momentos de pura felicidade através de nossos produtos. Acreditamos que o alimento é mais do que nutrição, é uma conexão, um abraço saboroso. Nosso compromisso é com a qualidade superior de cada ingrediente e a cobertura de um serviço impecável, garantindo que cada cliente se sinta especial e acolhido.
              </p>
            </div>

            {/* Botão de Ação: Ver o Catálogo */}
            <div style={{ marginTop: "0.5rem" }}>
              <Link
                href="/produtos"
                style={{
                  display: "inline-block",
                  backgroundColor: "#6B3E2E",
                  color: "#FFFCF8",
                  padding: "0.85rem 2rem",
                  borderRadius: "30px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 12px rgba(107, 62, 46, 0.2)",
                  transition: "opacity 0.2s",
                }}
              >
                VER O CATÁLOGO
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}