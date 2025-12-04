import React from "react";

export default function ExpressionInput({
  expression,
  setExpression,
  propositions,
}) {
  const insertSymbol = (symbol) => {
    const input = document.getElementById("expr");
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newValue =
      expression.substring(0, start) + symbol + expression.substring(end);
    setExpression(newValue);
    setTimeout(() => {
      input.focus();
      input.selectionStart = input.selectionEnd = start + symbol.length;
    }, 0);
  };

  const operators = [
    { sym: "∧", title: "AND" },
    { sym: "∨", title: "OR" },
    { sym: "⊕", title: "XOR" },
    { sym: "→", title: "IMPLICA" },
    { sym: "↔", title: "BICONDICIONAL" },
    { sym: "¬", title: "NOT" },
    { sym: "(", title: "(" },
    { sym: ")", title: ")" },
    { sym: "↑", title: "NAND" },
    { sym: "↓", title: "NOR" },
  ]; // Se añadió NAND y NOR

  return (
    <div className="expr-bar">
      <div className="op-buttons">
        {operators.map((op) => (
          <button
            key={op.sym}
            title={op.title}
            aria-label={op.title}
            onClick={() => insertSymbol(op.sym)}
          >
            <span className="op-symbol">{op.sym}</span>
            <small className="op-title">{op.title}</small>
          </button>
        ))}
      </div>

      <input
        id="expr"
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value.toUpperCase())}
        placeholder="Ej: (P ∧ Q) → (R ⊕ S)"
      />

      <p style={{ color: "var(--muted)", marginTop: "8px" }}>
        Variables disponibles:{" "}
        {propositions.map((p) => (
          <strong key={p.name} style={{ marginRight: "6px" }}>
            {p.name}
          </strong>
        ))}
      </p>
    </div>
  );
}
