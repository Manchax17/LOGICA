import React from "react";

export default function PropositionList({
  propositions,
  updateProposition,
  removeProposition,
  addProposition,
}) {
  return (
    <>
      {propositions.map((p, i) => (
        <div key={i} className="statement">
          <span className="symbol">{p.name}</span>
          <input
            type="text"
            placeholder="Descripción"
            value={p.description}
            onChange={(e) => updateProposition(i, "description", e.target.value)}
          />
          <label className="truth">
            <input
              type="checkbox"
              checked={p.value}
              onChange={(e) => updateProposition(i, "value", e.target.checked)}
            />
            Verdadero
          </label>
          <button
            style={{
              background: "none",
              border: "1px solid #22314f",
              color: "#ff6b6b",
              borderRadius: "6px",
              padding: "4px 8px",
              cursor: "pointer",
            }}
            onClick={() => removeProposition(i)}
          >
            ✖
          </button>
        </div>
      ))}

      <button
        style={{
          marginTop: "12px",
          background: "var(--accent)",
          border: "none",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
        onClick={addProposition}
      >
        ➕ Agregar Proposición
      </button>
    </>
  );
}
