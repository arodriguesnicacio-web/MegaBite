"use client";

import { useState } from "react";
import Link from "next/link";

export default function OrcamentoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    tipoEvento: "Aniversário",
    numPessoas: "20",
    saborMassa: "Chocolate",
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
    
    // Gerar mensagem formatada para o WhatsApp
    const mensagem = `*Novo Pedido de Encomenda - MegaBite*\n\n` +
      `*Nome:* ${formData.nome}\n` +
      `*Telefone:* ${formData.telefone}\n` +
      `*Evento:* ${formData.tipoEvento}\n` +
      `*Nº de Convidados:* ${formData.numPessoas} pessoas\n` +
      `*Massa:* ${formData.saborMassa}\n` +
      `*Recheio:* ${formData.saborRecheio}\n` +
      `*Data Pretendida:* ${formData.dataEntrega}\n` +
      `*Observações:* ${formData.observacoes || "Nenhuma"}`;

    const numeroWhatsApp = "5528999999999"; // Substituir pelo número real futuramente
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // Redirecionar para o WhatsApp
    window.open(urlWhatsApp, "_blank");
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <Link
        href="/"
        style={{ color: "#106d41", textDecoration: "none", fontWeight: "bold", display: "inline-block", marginBottom: "1.5rem" }}
      >
        ← Voltar ao Início
      </Link>

      <h1 style={{ textAlign: "center", color: "#1f2937", marginBottom: "0.5rem" }}>Encomendas Personalizadas</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem" }}>
        Monte o seu bolo ou kit de festa ideal e receba um orçamento diretamente no WhatsApp.
      </p>

      {submitted ? (
        <div style={{ backgroundColor: "#ecfdf5", border: "1px solid #10b981", padding: "2rem", borderRadius: "8px", textAlign: "center" }}>
          <h2 style={{ color: "#065f46", marginTop: 0 }}>Pedido Enviado!</h2>
          <p style={{ color: "#047857" }}>
            A sua mensagem foi formatada e aberta no WhatsApp. Responderemos o mais breve possível!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#106d41",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Fazer Nova Encomenda
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", background: "#fff", padding: "2rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Seu Nome *</label>
              <input
                type="text"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: Maria Silva"
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Telefone / WhatsApp *</label>
              <input
                type="text"
                name="telefone"
                required
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(28) 99999-9999"
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Tipo de Evento</label>
              <select
                name="tipoEvento"
                value={formData.tipoEvento}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", background: "#fff" }}
              >
                <option value="Aniversário">Aniversário</option>
                <option value="Casamento">Casamento</option>
                <option value="Batizado">Batizado</option>
                <option value="Corporativo">Evento Corporativo</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Estimativa de Convidados</label>
              <input
                type="number"
                name="numPessoas"
                value={formData.numPessoas}
                onChange={handleChange}
                min="5"
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Sabor da Massa</label>
              <select
                name="saborMassa"
                value={formData.saborMassa}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", background: "#fff" }}
              >
                <option value="Chocolate">Chocolate 50%</option>
                <option value="Baunilha">Baunilha Tradicional</option>
                <option value="Red Velvet">Red Velvet</option>
                <option value="Cenoura">Cenoura</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Sabor do Recheio</label>
              <select
                name="saborRecheio"
                value={formData.saborRecheio}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", background: "#fff" }}
              >
                <option value="Brigadeiro Gourmet">Brigadeiro Gourmet</option>
                <option value="Ninho com Morango">Ninho com Morango</option>
                <option value="Doce de Leite com Nozes">Doce de Leite com Nozes</option>
                <option value="Limão Siciliano">Limão Siciliano</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Data Pretendida para Entrega *</label>
            <input
              type="date"
              name="dataEntrega"
              required
              value={formData.dataEntrega}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Observações / Tema do Bolo</label>
            <textarea
              name="observacoes"
              rows={4}
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Descreva detalhes como cores, decoração desejada ou alergias alimentares..."
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", boxSizing: "border-box" }}
            />
          </div>

          <button
            type="submit"
            style={{
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
            Enviar Pedido via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
} 