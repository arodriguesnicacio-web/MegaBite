"use client";

import { useState } from "react";
import Link from "next/link";

export default function OrcamentoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    tipoEvento: "Aniversário",
    numPessoas: "20",
    saborMassa: "Chocolate 50%",
    saborRecheio: "Brigadeiro Gourmet",
    dataEntrega: "",
    observacoes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formatação da mensagem para o WhatsApp
    const mensagem = `*Novo Pedido de Encomenda - MegaBite*\n\n` +
      `*Nome:* ${formData.nome}\n` +
      `*Telefone:* ${formData.telefone}\n` +
      `*Evento:* ${formData.tipoEvento}\n` +
      `*Nº de Convidados:* ${formData.numPessoas} pessoas\n` +
      `*Massa:* ${formData.saborMassa}\n` +
      `*Recheio:* ${formData.saborRecheio}\n` +
      `*Data Pretendida:* ${formData.dataEntrega}\n` +
      `*Observações:* ${formData.observacoes || "Nenhuma"}`;

    const numeroWhatsApp = "5528999999999"; // Substituir pelo número oficial futuramente
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsApp, "_blank");
    setSubmitted(true);
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
          Monte o seu bolo ou kit de festa ideal e solicite seu orçamento diretamente via WhatsApp.
        </p>

        {submitted ? (
          <div style={{ backgroundColor: "#FDF6F0", border: "1px solid #F0BFB3", padding: "2.5rem 2rem", borderRadius: "12px", textAlign: "center" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.5rem" }}>🎉</span>
            <h2 style={{ color: "#6B3E2E", marginTop: 0, fontSize: "1.5rem" }}>Pedido Formatado!</h2>
            <p style={{ color: "#6B3E2E", opacity: 0.85, lineHeight: "1.5" }}>
              A sua mensagem foi aberta no WhatsApp. Responderemos o mais breve possível para confirmar todos os detalhes!
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
                  value={formData.nome}
                  onChange={handleChange}
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
                  value={formData.telefone}
                  onChange={handleChange}
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
                  value={formData.tipoEvento}
                  onChange={handleChange}
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
                  value={formData.numPessoas}
                  onChange={handleChange}
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
                  value={formData.saborMassa}
                  onChange={handleChange}
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
                  value={formData.saborRecheio}
                  onChange={handleChange}
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
                value={formData.dataEntrega}
                onChange={handleChange}
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
                value={formData.observacoes}
                onChange={handleChange}
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
              style={{
                padding: "0.9rem",
                backgroundColor: "#6B3E2E",
                color: "#FFFCF8",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              Enviar Pedido via WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 