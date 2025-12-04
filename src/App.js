import React, { useState, useMemo } from "react";
import "./App.css";
import PropositionList from "./components/PropositionList";
import ExpressionInput from "./components/ExpressionInput";
import TruthTable from "./components/TruthTable";
import NaturalLanguage from "./components/NaturalLanguage";
import { parseExpression } from "./utils/expressionParser";
import ExpressionComparator from "./components/ExpressionComparator";



// 🔹 Genera letras desde P en adelante
function getNextLetter(index) {
  const startChar = "P".charCodeAt(0); // 80
  return String.fromCharCode(startChar + index);
}

// 🔹 Reemplaza los símbolos lógicos por expresiones JS válidas
function toJS(expr) {
  return expr
    .replace(/¬/g, "!")
    .replace(/∧/g, "&&")
    .replace(/∨/g, "||")
    .replace(/⊕/g, "!==")
    .replace(/↔/g, "===")
    .replace(/→/g, "=>")
    //Las operaciones NAND y NOR se expandirán a operaciones booleanas de JS una vez que las variables se sustituyan por verdadero/falso.
    ;
}

export default function App() {
  const [propositions, setPropositions] = useState([
    { name: "P", description: "Hoy es lunes", value: true },
    { name: "Q", description: "Hace sol", value: true },
    { name: "R", description: "Es temprano", value: true },
  ]);

  const [expression, setExpression] = useState("(P↔Q)⊕R");
  const [error, setError] = useState("");

  // Agregar proposición (letras desde P)
  const addProposition = () => {
  if (propositions.length === 0) {
    setPropositions([{ name: "P", description: "", value: true }]);
    return;
  }

  // Obtener el último nombre alfabético
  const lastName = propositions[propositions.length - 1].name;
  const nextLetter = String.fromCharCode(lastName.charCodeAt(0) + 1);

  setPropositions([
    ...propositions,
    { name: nextLetter, description: "", value: true },
  ]);
};


  const updateProposition = (index, field, newValue) => {
    const copy = [...propositions];
    copy[index][field] = newValue;
    setPropositions(copy);
  };

  const removeProposition = (index) => {
    const copy = [...propositions];
    copy.splice(index, 1);
    setPropositions(copy);
  };

  // 🔹 Generar tabla y subexpresiones
  const truthTable = useMemo(() => {
    if (!expression.trim()) return [];
    try {
      const usedLetters = Array.from(
        new Set(expression.match(/[A-Z]/g) || [])
      );

      const undefinedVars = usedLetters.filter(
        (l) => !propositions.some((p) => p.name === l)
      );
      if (undefinedVars.length > 0) {
        setError(`Las siguientes variables no están definidas: ${undefinedVars.join(", ")}`);
        return [];
      }
      setError("");

      const n = propositions.length;
      const combinations = [];
      for (let i = 0; i < Math.pow(2, n); i++) {
        const row = {};
        propositions.forEach((p, j) => {
          row[p.name] = Boolean((i >> (n - j - 1)) & 1);
        });
        combinations.push(row);
      }

      // 🔹 Detectar subexpresiones entre paréntesis (por partes)
      const subMatches = Array.from(expression.matchAll(/\([^()]+\)/g)).map(
        (m) => m[0]
      );
      const uniqueSubs = [...new Set(subMatches)];

      // Última expresión es la completa
      const allExpressions = [...uniqueSubs, expression];

      // 🔹 Evaluar cada combinación y subexpresión usando parseExpression (maneja correctamente ↑ y ↓)
      const rows = combinations.map((row) => {
        const resultRow = { ...row };
        for (let expr of allExpressions) {
          try {
            const fn = parseExpression(expr);
            resultRow[expr] = Boolean(fn(row));
          } catch (e) {
            resultRow[expr] = false;
          }
        }
        return resultRow;
      });

      return { rows, expressions: allExpressions };
    } catch (e) {
      setError("Error al evaluar la expresión.");
      return [];
    }
  }, [expression, propositions]);

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Generador de Tablas de Verdad</h1>
          <p>
            Define tus proposiciones (desde P) y escribe una expresión lógica
            personalizada.
          </p>
        </header>

        <div className="input-section">
          <h3>Proposiciones</h3>
          <PropositionList
            propositions={propositions}
            updateProposition={updateProposition}
            removeProposition={removeProposition}
            addProposition={addProposition}
          />
        </div>

        <div className="input-section">
          <h3>Expresión Lógica</h3>
          <ExpressionInput
            expression={expression}
            setExpression={setExpression}
            propositions={propositions}
          />
          {error && (
            <p style={{ color: "#ff6b6b", marginTop: "8px" }}>{error}</p>
          )}
        </div>

        <TruthTable
          propositions={propositions}
          truthTable={truthTable.rows || []}
          subExpressions={truthTable.expressions || []}
        />
        <NaturalLanguage expression={expression} propositions={propositions} />
        <ExpressionComparator propositions={propositions} />
 
        <footer className="footer">
          Desarrollado por Alexis, Diego y Daniel — React Logic System © 2025
        </footer>
      </div>
    </div>
  );
}
