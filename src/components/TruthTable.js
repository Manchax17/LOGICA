import React from "react";

export default function TruthTable({ propositions, truthTable, subExpressions }) {
  if (!truthTable.length) return null;

  // Evita duplicar subexpresiones si están vacías
  const validSubs = (subExpressions || []).filter((s) => s && s.toString().trim());

  // 🧩 Obtener la expresión principal
  const mainExpr = subExpressions?.at(-1);
  const trueCount = truthTable.filter((r) => r[mainExpr]).length;
  const totalCount = truthTable.length;

  // 🧮 Determinar tipo de proposición (tautología, contingencia o falacia)
  let classification = "";
  if (trueCount === totalCount) classification = "Tautología";
  else if (trueCount === 0) classification = "Falacia (Contradicción)";
  else classification = "Contingencia";

  return (
    <div className="truth-table">
      <div className="table-header">
        <h2>Tabla de Verdad</h2>

        <div className="summary">
          <span className="muted">
            {trueCount} verdaderas de {totalCount}
          </span>
          <br />
          {/* 🧠 Indicador lógico */}
          <span
            className={`classification ${
              classification === "Tautología"
                ? "tautology"
                : classification.includes("Falacia")
                ? "contradiction"
                : "contingency"
            }`}
          >
            {classification}
          </span>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {propositions.map((p) => (
                <th key={p.name}>{p.name}</th>
              ))}

              {validSubs.map((sub, i) => (
                <th key={i}>{sub}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {truthTable.map((row, i) => (
              <tr key={i}>
                {propositions.map((p) => (
                  <td key={p.name}>
                    <span className={`truth-value ${row[p.name] ? "true" : "false"}`}>
                      {row[p.name] ? "V" : "F"}
                    </span>
                  </td>
                ))}

                {validSubs.map((sub, j) => {
                  const plainKey = sub ? sub.toString().replace(/\s+/g, "") : sub;
                  const value = row[sub] !== undefined ? row[sub] : row[plainKey] ?? row.result;
                  return (
                    <td key={j}>
                      <span className={`truth-value ${value ? "true" : "false"}`}>
                        {value ? "V" : "F"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
