import React, { useState, useMemo } from "react";
import generateTruthTable from "../utils/truthTableGenerator";
import { parseExpression } from "../utils/expressionParser";
import validateExpression from "../utils/expressionValidator";
import "./ExpressionComparator.css";

export default function ExpressionComparator() {
  const [expr1, setExpr1] = useState("(P↔Q)⊕R");
  const [expr2, setExpr2] = useState("¬((P∨Q)→R)");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);


  // Diccionario de operadores lógicos
  const operators = [
    { sym: "∧", title: "AND" },    
    { sym: "∨", title: "OR" },    
    { sym: "⊕", title: "XOR" },  
    { sym: "→", title: "IMPLIES" }, 
    { sym: "↔", title: "IFF" },     
    { sym: "¬", title: "NOT" },   
    { sym: "(", title: "(" },     
    { sym: ")", title: ")" },
    { sym: "↑", title: "NAND" },
    { sym: "↓", title: "NOR" },
    { sym: "⊙", title: "XNOR" },
  ]; 

  const insertOperator = (op, target) => {
    if (target === 1) setExpr1((prev) => prev + op);
    else setExpr2((prev) => prev + op);
  };

  const compareExpressions = useMemo(() => {
    if (!expr1 || !expr2) return null;

    if (!validateExpression(expr1) || !validateExpression(expr2)) {
      setError("Una o ambas expresiones tienen errores de sintaxis.");
      return null;
    }

    setError("");

  // Ensure both tables are generated over the same set of variables
  const vars1 = Array.from(new Set(expr1.match(/[A-Z]/g) || []));
  const vars2 = Array.from(new Set(expr2.match(/[A-Z]/g) || []));
  const unionVars = Array.from(new Set([...vars1, ...vars2])).sort();

    const table1 = generateTruthTable(expr1, unionVars);
    const table2 = generateTruthTable(expr2, unionVars);

    // Step-by-step subexpressions for display: detect simple parenthesized subexpressions
    const subMatches1 = Array.from(expr1.matchAll(/\([^()]+\)/g)).map((m) => m[0]);
    const uniqueSubs1 = [...new Set(subMatches1)];
    const allExprs1 = [...uniqueSubs1, expr1];

    const subMatches2 = Array.from(expr2.matchAll(/\([^()]+\)/g)).map((m) => m[0]);
    const uniqueSubs2 = [...new Set(subMatches2)];
    const allExprs2 = [...uniqueSubs2, expr2];

    // Enhance tables adding values for each subexpression (so UI can show step-by-step columns)
    const enhancedTable1 = table1.map((row) => {
      const newRow = { ...row };
      for (const e of allExprs1) {
        try {
          const fn = parseExpression(e);
          newRow[e] = Boolean(fn(row));
        } catch {
          newRow[e] = false;
        }
      }
      return newRow;
    });

    const enhancedTable2 = table2.map((row) => {
      const newRow = { ...row };
      for (const e of allExprs2) {
        try {
          const fn = parseExpression(e);
          newRow[e] = Boolean(fn(row));
        } catch {
          newRow[e] = false;
        }
      }
      return newRow;
    });

    const areEquivalent = enhancedTable1.every((row, index) => {
      return row.result === enhancedTable2[index].result;
    });

    setResult(areEquivalent ? "Equivalentes" : "No equivalentes");

    return {
      table1: enhancedTable1,
      table2: enhancedTable2,
      areEquivalent,
    };
  }, [expr1, expr2]);

  return (
    <div className="expression-comparator">
      <h3 className="title">Comparador de Expresiones</h3>
      <div className="input-section">
        <div className="expr-input">
          <label>Primera expresión</label>
          <div className="expr-bar">
            <input
              type="text"
              value={expr1}
              onChange={(e) => setExpr1(e.target.value)}
              placeholder="Ej: (P↔Q)⊕R"
            />
            <div className="op-buttons">
              {operators.map((op) => (
                <button
                  key={op.sym}
                  title={op.title}
                  aria-label={op.title}
                  onClick={() => insertOperator(op.sym, 1)}
                >
                  <span className="op-symbol">{op.sym}</span>
                  <small className="op-title">{op.title}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="expr-input">
          <label>Segunda expresión</label>
          <div className="expr-bar">
            <input
              type="text"
              value={expr2}
              onChange={(e) => setExpr2(e.target.value)}
              placeholder="Ej: ¬((P∨Q)→R)"
            />
            <div className="op-buttons">
              {operators.map((op) => (
                <button
                  key={op.sym}
                  title={op.title}
                  aria-label={op.title}
                  onClick={() => insertOperator(op.sym, 2)}
                >
                  <span className="op-symbol">{op.sym}</span>
                  <small className="op-title">{op.title}</small>
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>

      {compareExpressions && (
        <div className="truth-tables">
          <div className="table-container">
            <h4>Tabla de Verdad - {expr1}</h4>
            <table className="truth-table">
              <thead>
                <tr>
                  {Object.keys(compareExpressions.table1[0]).map((key) => (
                    <th key={key}>{key === "result" ? expr1 : key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareExpressions.table1.map((row, index) => (
                  <tr key={index}>
                    {Object.entries(row).map(([key, value]) => (
                      <td key={key} className={value ? "true" : "false"}>{value ? "V" : "F"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-container">
            <h4>Tabla de Verdad - {expr2}</h4>
            <table className="truth-table">
              <thead>
                <tr>
                  {Object.keys(compareExpressions.table2[0]).map((key) => (
                    <th key={key}>{key === "result" ? expr2 : key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareExpressions.table2.map((row, index) => (
                  <tr key={index}>
                    {Object.entries(row).map(([key, value]) => (
                      <td key={key} className={value ? "true" : "false"}>{value ? "V" : "F"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result && (
        <div className="result-display">
          <span className={`result-badge ${result === "Equivalentes" ? "true" : "false"}`}>
            {result}
          </span>
        </div>
      )}
    </div>
  );
}
