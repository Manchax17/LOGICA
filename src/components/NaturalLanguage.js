import React from "react";
import "./NaturalLanguage.css";

// Palabras naturales para operadores (español)
const operatorWords = {
  "∧": "y",
  "∨": "o",
  "↔": "si y solo si",
   // La implicación se maneja de forma especial para incluir la coma: "si A, entonces B"
  "→": "si...entonces",
   // XOR se expresará como: "A o B, pero no ambas"
  "⊕": "o",
  // Use short 'No' for negation to match user's preference
  "¬": "No",
  // NAND/NOR phrasing built using 'No' as prefix
  "↑": "No es cierto que",
  "↓": "No es cierto que",
};

// Prioridad de operadores (mayor a menor)
const precedence = ["↔", "→", "⊕", "∨", "∧", "↑", "↓", "¬"];

// Reemplaza letras por sus descripciones
function replaceProps(expr, propositions) {
  let result = expr;
  for (const p of propositions) {
    const regex = new RegExp(`\\b${p.name}\\b`, "g");
    result = result.replace(regex, p.description || p.name);
  }
  return result;
}

// Encuentra el operador principal fuera de paréntesis
function findMainOperator(expr) {
  let depth = 0;
  let mainOp = null;
  let splitIndex = -1;

  for (let i = expr.length - 1; i >= 0; i--) {
    const ch = expr[i];
    if (ch === ")") depth++;
    else if (ch === "(") depth--;
    else if (depth === 0 && precedence.includes(ch)) {
      mainOp = ch;
      splitIndex = i;
      break;
    }
  }

  return { mainOp, splitIndex };
}

// Traduce una expresión lógica en texto natural (español)
function parseToNatural(expr, propositions) {
  expr = expr.trim();

  // Eliminar paréntesis externos redundantes repetidamente
  while (expr.startsWith("(") && expr.endsWith(")")) {
    let depth = 0;
    let balanced = true;
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === "(") depth++;
      if (expr[i] === ")") depth--;
      if (depth === 0 && i < expr.length - 1) {
        balanced = false;
        break;
      }
    }
    if (!balanced) break;
    expr = expr.slice(1, -1).trim();
  }

  // Manejo de doble negación: ¬¬A => A
  while (expr.startsWith("¬¬")) {
    expr = expr.slice(2).trim();
  }

  // Negación
  if (expr.startsWith("¬")) {
    const sub = expr.slice(1).trim();
    const parsedSub = parseToNatural(sub, propositions);
    
    // Evitar "No No ..." o "No No es cierto que ..." — si ya comienza con 'No', quitarla
    if (/^No\s*/i.test(parsedSub)) {
      return parsedSub.replace(/^No\s*/i, "");
    }
    return `${operatorWords["¬"]} ${parsedSub}`;
  }

  // Buscar operador principal
  const { mainOp, splitIndex } = findMainOperator(expr);
  if (!mainOp) return replaceProps(expr, propositions);

  const left = expr.slice(0, splitIndex).trim();
  const right = expr.slice(splitIndex + 1).trim();

  // Formateos especiales
  if (mainOp === "→") {
    const leftText = parseToNatural(left, propositions);
    const rightText = parseToNatural(right, propositions);
    // Evitar duplicar 'si' cuando el lado izquierdo ya empieza con 'si '
    if (/^si\s+/i.test(leftText.trim())) {
      return `${leftText}, entonces ${rightText}`;
    }
    return `si ${leftText}, entonces ${rightText}`;
  }

  if (mainOp === "⊕") {
    return `${parseToNatural(left, propositions)} o ${parseToNatural(right, propositions)}, pero no ambas`;
  }

  if (mainOp === "↑") {
    // NAND: "No A y B a la vez"
    const lt = parseToNatural(left, propositions);
    const rt = parseToNatural(right, propositions);
    return `${operatorWords["↑"]} ${lt} y ${rt} a la vez`;
  }

  if (mainOp === "↓") {
    // NOR: "No A o B sean verdaderas"
    const lt = parseToNatural(left, propositions);
    const rt = parseToNatural(right, propositions);
    return `${operatorWords["↓"]} ${lt} o ${rt} sean verdaderas`;
  }

  // Operadores binarios por defecto
  const leftText = parseToNatural(left, propositions);
  const rightText = parseToNatural(right, propositions);
  const opWord = operatorWords[mainOp] || mainOp;

  return `${leftText} ${opWord} ${rightText}`;
}

export default function NaturalLanguage({ expression, propositions }) {
  if (!expression || !expression.trim()) return null;

  const naturalText = parseToNatural(expression, propositions);

  return (
    <div className="natural-language">
      <h3>Lenguaje Natural</h3>
      <p>{naturalText}</p>
    </div>
  );
}
