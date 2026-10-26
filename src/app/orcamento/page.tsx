"use client";

import { useState } from "react";
import Link from "next/link";
import { createQuoteAction } from "@/app/actions/quote";

export default function OrcamentoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await createQuoteAction(formData);

    setLoading(false);

    if (result.success && result.urlWhatsApp) {
      window.open(result.urlWhatsApp, "_blank");
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || "Ocorreu um erro ao enviar o pedido.");
    }
  };

  return (
    <div style={{ backgroundColor: "#FFFCF8", color: "#6B3E2E", minHeight: "100vh", padding: "2.5rem 1rem", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        <Link
          href="/"
          style={{ color: "#6B3E2E", textDecoration: "none", fontWeight: "bold", display: "inline-block", marginBottom: "1.5rem", fontSize: "0.95rem" }}
        >
          ← Voltar ao Início
        </Link>

        <h1 style={{ textAlign: "center", color: "#6B3E2E", marginBottom: "0.5rem", fontSize: "2rem" }}>
          Encomendas Personalizadas
        </h1>
        <p style={{ textAlign: "center", color: "#6B3E2E", opacity: 0.8, marginBottom: "2rem", fontSize: "0.95rem" }}>
          Monte o seu bolo ou kit de festa ideal e solicite seu orçamento com persistência segura no sistema e envio via WhatsApp.
        </p>

        {errorMessage && (
          <div style={{ backgroundColor: "#FDE8E8", color: "#C53030", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center", fontWeight: "bold" }}>
            {errorMessage}
          </div>
        )}

        {submitted ? (
          <div style={{ backgroundColor: "#FDF6F0", border: "1px solid #F0BFB3", padding: "2.5rem 2rem", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.5rem" }}>🎉</span>
            <h2 style={{ color: "#6B3E2E", marginTop: 0, fontSize: "1.5rem" }}>Pedido Salvo e Formatado!</h2>
            <p style={{ color: "#6B3E2E", opacity: 0.85, lineHeight: "1.5" }}>
              O seu orçamento foi registrado com sucesso na base de dados e a mensagem foi aberta no WhatsApp.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#6B3E2E",
                color: "#FFFCF8",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Fazer Nova Encomenda
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              background: "#FDF6F0",
              padding: "2rem",
              borderRadius: "12px",
              border: "1px solid #F0BFB3",
              boxShadow: "0 4px 12px rgba(107, 62, 46, 0.03)",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                  Seu Nome *
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  placeholder="Ex: Maria Silva"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #F0BFB3",
                    borderRadius: "6px",
                    backgroundColor: "#FFFCF8",
                    color: "#6B3E2E",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                  Telefone / WhatsApp *
                </label>
                <input
                  type="text"
                  name="telefone"
                  required
                  placeholder="(28) 99999-9999"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #F0BFB3",
                    borderRadius: "6px",
                    backgroundColor: "#FFFCF8",
                    color: "#6B3E2E",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                  Tipo de Evento
                </label>
                <select
                  name="tipoEvento"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #F0BFB3",
                    borderRadius: "6px",
                    backgroundColor: "#FFFCF8",
                    color: "#6B3E2E",
                  }}
                >
                  <option value="Aniversário">Aniversário</option>
                  <option value="Casamento">Casamento</option>
                  <option value="Batizado">Batizado</option>
                  <option value="Corporativo">Evento Corporativo</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                  Estimativa de Convidados
                </label>
                <input
                  type="number"
                  name="numPessoas"
                  defaultValue="20"
                  min="5"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #F0BFB3",
                    borderRadius: "6px",
                    backgroundColor: "#FFFCF8",
                    color: "#6B3E2E",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                  Sabor da Massa
                </label>
                <select
                  name="saborMassa"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #F0BFB3",
                    borderRadius: "6px",
                    backgroundColor: "#FFFCF8",
                    color: "#6B3E2E",
                  }}
                >
                  <option value="Chocolate 50%">Chocolate 50%</option>
                  <option value="Baunilha Tradicional">Baunilha Tradicional</option>
                  <option value="Red Velvet">Red Velvet</option>
                  <option value="Cenoura">Cenoura</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                  Sabor do Recheio
                </label>
                <select
                  name="saborRecheio"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #F0BFB3",
                    borderRadius: "6px",
                    backgroundColor: "#FFFCF8",
                    color: "#6B3E2E",
                  }}
                >
                  <option value="Brigadeiro Gourmet">Brigadeiro Gourmet</option>
                  <option value="Ninho com Morango">Ninho com Morango</option>
                  <option value="Doce de Leite com Nozes">Doce de Leite com Nozes</option>
                  <option value="Limão Siciliano">Limão Siciliano</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                Data Pretendida para Entrega *
              </label>
              <input
                type="date"
                name="dataEntrega"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #F0BFB3",
                  borderRadius: "6px",
                  backgroundColor: "#FFFCF8",
                  color: "#6B3E2E",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                Observações / Tema do Bolo
              </label>
              <textarea
                name="observacoes"
                rows={4}
                placeholder="Descreva detalhes como cores, decoração desejada ou restrições alimentares..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #F0BFB3",
                  borderRadius: "6px",
                  backgroundColor: "#FFFCF8",
                  color: "#6B3E2E",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.9rem",
                backgroundColor: "#6B3E2E",
                color: "#FFFCF8",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: "0.5rem",
              }}
            >
              {loading ? "Salvando e Enviando..." : "Enviar Pedido via WhatsApp"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}