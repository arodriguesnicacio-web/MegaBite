"use client";

import { updateQuoteStatusAction, StatusOrcamento } from "../actions/actions";

interface StatusUpdaterProps {
  quoteId: string;
  initialStatus: string;
}

export default function StatusUpdater({ quoteId, initialStatus }: StatusUpdaterProps) {
  return (
    <form
      action={async (formData) => {
        const newStatus = formData.get("status") as StatusOrcamento;
        await updateQuoteStatusAction(quoteId, newStatus);
      }}
    >
      <select
        name="status"
        defaultValue={initialStatus}
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
  );
}