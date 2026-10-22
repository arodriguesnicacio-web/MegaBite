import { prisma } from "@/lib/prisma";
import { updateQuoteStatusAction, StatusOrcamento } from "../actions/actions";
import Link from "next/link";

export default async function AdminDashboardPage() {
  let quotes: any[] = [];
  try {
    // Consulta SQL direta para evitar conflitos de mapeamento do Prisma Client
    quotes = await prisma.$queryRaw`SELECT * FROM quote_request`;
  } catch (error) {
    console.error("Erro ao procurar orçamentos:", error);
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "SOLICITADO":
        return { bg: "#FFF3CD", color: "#856404", border: "#FFEEBA" };
      case "EM_ANALISE":
        return { bg: "#D1ECF1", color: "#0C5460", border: "#BEE5EB" };
      case "APROVADO":
        return { bg: "#D4EDDA", color: "#155724", border: "#C3E6CB" };
      case "RECUSADO":
        return { bg: "#F8D7DA", color: "#721C24", border: "#F5C6CB" };
      default:
        return { bg: "#E2E3E5", color: "#383D41", border: "#D6D8DB" };
    }
  };

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
        
        {/* Cabeçalho */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#6B3E2E" }}>
              Painel Administrativo
            </h1>
            <p style={{ opacity: 0.8, fontSize: "0.95rem" }}>
              Gestão de Pedidos de Orçamento da MegaBite
            </p>
          </div>
          <Link
            href="/"
            style={{
              backgroundColor: "#FDF6F0",
              color: "#6B3E2E",
              padding: "0.6rem 1.2rem",
              borderRadius: "20px",
              border: "1px solid #F0BFB3",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            ← Voltar ao Site
          </Link>
        </div>

        {/* Lista */}
        {quotes.length === 0 ? (
          <div
            style={{
              background: "#FDF6F0",
              padding: "3rem",
              borderRadius: "15px",
              textAlign: "center",
              border: "1px solid #F0BFB3",
            }}
          >
            <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
              Nenhum pedido de orçamento encontrado no momento.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {quotes.map((item: any) => {
              const badge = getStatusBadgeStyle(item.status);
              
              const nome = item.nome_cliente || item.nomeCliente || "Cliente não identificado";
              const tel = item.telefone || "";
              const produto = item.tipo_produto || item.tipoProduto || "N/A";
              const qtd = item.quantidade_pessoas || item.quantidadePessoas || "N/A";
              const data = item.data_desejada || item.dataDesejada || null;
              const tema = item.tema || "Sem tema";
              const obs = item.observacoes || "";

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#FDF6F0",
                    borderRadius: "16px",
                    border: "1px solid #F0BFB3",
                    padding: "1.5rem",
                    boxShadow: "0 4px 15px rgba(107, 62, 46, 0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginBottom: "1rem",
                      borderBottom: "1px solid #F0BFB3",
                      paddingBottom: "1rem",
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: "1.2rem", color: "#6B3E2E", margin: 0 }}>
                        {nome}
                      </h3>
                      <p style={{ fontSize: "0.85rem", opacity: 0.8, margin: "0.2rem 0 0 0" }}>
                        Telefone: {tel || "Não informado"}
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                          padding: "0.3rem 0.8rem",
                          borderRadius: "12px",
                          fontWeight: "bold",
                          fontSize: "0.8rem",
                        }}
                      >
                        {item.status}
                      </span>

                      <form
                        action={async (formData) => {
                          "use server";
                          const newStatus = formData.get("status") as StatusOrcamento;
                          await updateQuoteStatusAction(item.id, newStatus);
                        }}
                      >
                        <select
                          name="status"
                          defaultValue={item.status}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          style={{
                            padding: "0.4rem 0.8rem",
                            borderRadius: "8px",
                            border: "1px solid #6B3E2E",
                            backgroundColor: "#FFFCF8",
                            color: "#6B3E2E",
                            fontWeight: "bold",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                          }}
                        >
                          <option value="SOLICITADO">SOLICITADO</option>
                          <option value="EM_ANALISE">EM_ANALISE</option>
                          <option value="APROVADO">APROVADO</option>
                          <option value="RECUSADO">RECUSADO</option>
                        </select>
                      </form>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "1rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <div>
                      <strong>Produto:</strong> {produto}
                    </div>
                    <div>
                      <strong>Pessoas:</strong> {qtd}
                    </div>
                    <div>
                      <strong>Data Desejada:</strong>{" "}
                      {data ? new Date(data).toLocaleDateString("pt-BR") : "N/A"}
                    </div>
                    <div>
                      <strong>Tema:</strong> {tema}
                    </div>
                  </div>

                  {obs && (
                    <div style={{ marginTop: "1rem", fontSize: "0.88rem", background: "#FFFCF8", padding: "0.8rem", borderRadius: "8px" }}>
                      <strong>Observações / Restrições:</strong> {obs}
                    </div>
                  )}

                  {tel && (
                    <div style={{ marginTop: "1.2rem", textAlign: "right" }}>
                      <a
                        href={`https://wa.me/55${tel.replace(/\D/g, "")}?text=Olá%20${encodeURIComponent(nome)}!%20Estamos%20entrando%20em%20contato%20sobre%20o%20seu%20orçamento%20na%20MegaBite.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          backgroundColor: "#25D366",
                          color: "#FFF",
                          padding: "0.5rem 1.2rem",
                          borderRadius: "20px",
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: "0.85rem",
                        }}
                      >
                        💬 Responder no WhatsApp
                      </a>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}