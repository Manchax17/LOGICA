// src/utils/logicLaws.js
// Funciones para aplicar leyes de lógica proposicional

/**
 * Leyes de De Morgan
 * ¬(A ∧ B) ≡ (¬A ∨ ¬B)
 * ¬(A ∨ B) ≡ (¬A ∧ ¬B)
 */
export function deMorgan(expr) {
  // Normalizar (quitar espacios)
  const e = expr.replace(/\s+/g, "");
  // Solo aplica si la expresión es ¬(A∧B) o ¬(A∨B)
  if (/^¬\(([^∧∨]+)∧([^∧∨]+)\)$/.test(e)) {
    const [, a, b] = e.match(/^¬\(([^∧∨]+)∧([^∧∨]+)\)$/);
    return `¬${a} ∨ ¬${b}`;
  }
  if (/^¬\(([^∧∨]+)∨([^∧∨]+)\)$/.test(e)) {
    const [, a, b] = e.match(/^¬\(([^∧∨]+)∨([^∧∨]+)\)$/);
    return `¬${a} ∧ ¬${b}`;
  }
  return null;
}

/**
 * Ley de Identidad
 * A ∧ V ≡ A, A ∨ F ≡ A
 */
export function identidad(expr) {
  const e = expr.replace(/\s+/g, "");
  if (/^([A-Z])∧V$/.test(e)) return e[0];
  if (/^([A-Z])∨F$/.test(e)) return e[0];
  return null;
}

/**
 * Ley de Dominancia
 * A ∨ V ≡ V, A ∧ F ≡ F
 */
export function dominancia(expr) {
  const e = expr.replace(/\s+/g, "");
  if (/^([A-Z])∨V$/.test(e)) return 'V';
  if (/^([A-Z])∧F$/.test(e)) return 'F';
  return null;
}

/**
 * Ley de Absorción
 * A ∨ (A ∧ B) ≡ A, A ∧ (A ∨ B) ≡ A
 */
export function absorcion(expr) {
  let e = expr.replace(/\s+/g, "");

  // Helper: strip enclosing parentheses repeatedly when they match
  const stripParens = (s) => {
    let str = s;
    while (str.length > 1 && str[0] === '(' && str[str.length - 1] === ')') {
      // check matching parentheses inside
      let depth = 0;
      let matched = false;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') depth++;
        else if (str[i] === ')') depth--;
        if (depth === 0) {
          matched = (i === str.length - 1);
          break;
        }
      }
      if (matched) {
        str = str.slice(1, -1);
      } else break;
    }
    return str;
  };

  e = stripParens(e);

  // patterns to match absorption in either order, allowing inner parentheses stripped
  const patterns = [
    { regex: /^([A-Z])∨\(([A-Z])∧([A-Z])\)$/, aIndex: 1, bIndex: 2 },
    { regex: /^\(([A-Z])∧([A-Z])\)∨([A-Z])$/, aIndex: 3, bIndex: 1 },
    { regex: /^([A-Z])∧\(([A-Z])∨([A-Z])\)$/, aIndex: 1, bIndex: 2 },
    { regex: /^\(([A-Z])∨([A-Z])\)∧([A-Z])$/, aIndex: 3, bIndex: 1 }
  ];

  for (const p of patterns) {
    if (p.regex.test(e)) {
      const m = e.match(p.regex);
      const a = m[p.aIndex];
      const b = m[p.bIndex];
      if (a === b) return a;
    }
  }

  return null;
}

/**
 * Ley Asociativa
 * (A ∨ (B ∨ C)) ≡ ((A ∨ B) ∨ C)
 * (A ∧ (B ∧ C)) ≡ ((A ∧ B) ∧ C)
 */
export function asociativa(expr) {
  const e = expr.replace(/\s+/g, "");
  if (/^([A-Z])∨\(([A-Z])∨([A-Z])\)$/.test(e)) {
    const [, a, b, c] = e.match(/^([A-Z])∨\(([A-Z])∨([A-Z])\)$/);
    return `(${a} ∨ ${b}) ∨ ${c}`;
  }
  if (/^([A-Z])∧\(([A-Z])∧([A-Z])\)$/.test(e)) {
    const [, a, b, c] = e.match(/^([A-Z])∧\(([A-Z])∧([A-Z])\)$/);
    return `(${a} ∧ ${b}) ∧ ${c}`;
  }
  return null;
}

/**
 * Ley Distributiva
 * A ∧ (B ∨ C) ≡ (A ∧ B) ∨ (A ∧ C)
 * A ∨ (B ∧ C) ≡ (A ∨ B) ∧ (A ∨ C)
 */
export function distributiva(expr) {
  const e = expr.replace(/\s+/g, "");
  if (/^([A-Z])∧\(([A-Z])∨([A-Z])\)$/.test(e)) {
    const [, a, b, c] = e.match(/^([A-Z])∧\(([A-Z])∨([A-Z])\)$/);
    return `(${a} ∧ ${b}) ∨ (${a} ∧ ${c})`;
  }
  if (/^([A-Z])∨\(([A-Z])∧([A-Z])\)$/.test(e)) {
    const [, a, b, c] = e.match(/^([A-Z])∨\(([A-Z])∧([A-Z])\)$/);
    return `(${a} ∨ ${b}) ∧ (${a} ∨ ${c})`;
  }
  return null;
}

/**
 * Leyes de Contradicción y Tautología
 * A ∧ ¬A ≡ F
 * A ∨ ¬A ≡ V
 */
export function contradiccion(expr) {
  const e = expr.replace(/\s+/g, "");
  // A∧¬A or ¬A∧A (simple forms)
  if (/^([A-Z])∧¬\1$/.test(e)) return 'F';
  if (/^¬([A-Z])∧\1$/.test(e)) return 'F';
  if (/^\(([A-Z])\)∧¬\1$/.test(e)) return 'F';
  return null;
}

export function tautologia(expr) {
  const e = expr.replace(/\s+/g, "");
  if (/^([A-Z])∨¬\1$/.test(e)) return 'V';
  if (/^¬([A-Z])∨\1$/.test(e)) return 'V';
  if (/^\(([A-Z])\)∨¬\1$/.test(e)) return 'V';
  return null;
}

// Puedes agregar más leyes relevantes aquí

import generateTruthTable from './truthTableGenerator';

// utility to strip matching outer parentheses
function stripParens(s) {
  let str = s.replace(/\s+/g, '');
  while (str.length > 1 && str[0] === '(' && str[str.length - 1] === ')') {
    // check matching parentheses inside
    let depth = 0;
    let matched = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') depth++;
      else if (str[i] === ')') depth--;
      if (depth === 0) {
        matched = (i === str.length - 1);
        break;
      }
    }
    if (matched) str = str.slice(1, -1);
    else break;
  }
  return str;
}

// Split expression at the top-level operator occurrence (not inside parentheses)
function splitTop(expr, operator) {
  const s = expr.replace(/\s+/g, '');
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (depth === 0) {
      // operator may be multi-char but we use single symbol operators like '→' or '↔'
      if (s[i] === operator) {
        const left = s.slice(0, i);
        const right = s.slice(i + 1);
        return [left, right];
      }
    }
  }
  return null;
}

// Find the index of the deepest occurrence of `operator` in the expression (ignoring whitespace)
function findDeepestOperatorIndex(expr, operator) {
  const s = expr.replace(/\s+/g, '');
  let depth = 0;
  let best = -1;
  let bestDepth = -1;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === operator) {
      if (depth >= bestDepth) {
        bestDepth = depth;
        best = i;
      }
    }
  }
  return best;
}

// Apply a single transformation at the deepest occurrence of operator using transformFn(left,right)
function transformDeepest(expr, operator, transformFn) {
  const s = expr.replace(/\s+/g, '');
  const idx = findDeepestOperatorIndex(s, operator);
  if (idx === -1) return null;
  // find left operand bounds
  let leftStart = idx - 1;
  if (s[leftStart] === ')') {
    // find matching '('
    let depth = 0;
    for (let i = leftStart; i >= 0; i--) {
      if (s[i] === ')') depth++;
      else if (s[i] === '(') {
        depth--;
        if (depth === 0) { leftStart = i; break; }
      }
    }
  }
  // if single symbol variable or negation before it, include negation
  else if (leftStart - 1 >= 0 && s[leftStart - 1] === '¬') {
    leftStart = leftStart - 1;
  }

  // find right operand bounds
  let rightEnd = idx + 1;
  if (s[rightEnd] === '(') {
    // find matching ')'
    let depth = 0;
    for (let i = rightEnd; i < s.length; i++) {
      if (s[i] === '(') depth++;
      else if (s[i] === ')') {
        depth--;
        if (depth === 0) { rightEnd = i; break; }
      }
    }
  }
  // if negation right after operator (unlikely) handle simply

  const before = s.slice(0, leftStart);
  const left = s.slice(leftStart, idx);
  const right = s.slice(idx + 1, rightEnd + 1);
  const after = s.slice(rightEnd + 1);

  const leftWrapped = (left.startsWith('(') && left.endsWith(')')) ? left : (left.length > 1 ? `(${left})` : left);
  const rightWrapped = (right.startsWith('(') && right.endsWith(')')) ? right : (right.length > 1 ? `(${right})` : right);

  const replacement = transformFn(leftWrapped, rightWrapped);
  return `${before}${replacement}${after}`;
}

/**
 * Simplify an expression by repeatedly applying known laws.
 * Returns an object { result: string, steps: Array<{name,result}> }
 */
export function simplify(expr, maxIterations = 10) {
  if (!expr || typeof expr !== 'string') return { result: expr, steps: [] };
  let current = stripParens(expr);
  const steps = [];
  // Priority: expand biconditionals (↔) first, then implications (→), then apply other rules

  // 1) Expand biconditionals everywhere (innermost first)
  for (;;) {
    const transformed = transformDeepest(current, '↔', (L, R) => `(${L} ∧ ${R}) ∨ (¬${L} ∧ ¬${R})`);
    if (!transformed || transformed === current) break;
    steps.push({ name: 'Expand Biconditional', before: current, after: transformed });
    current = stripParens(transformed);
  }

  // 2) Expand implications everywhere (innermost first)
  for (;;) {
    const transformed = transformDeepest(current, '→', (L, R) => `¬${L} ∨ ${R}`);
    if (!transformed || transformed === current) break;
    steps.push({ name: 'Expand Implication', before: current, after: transformed });
    current = stripParens(transformed);
  }

  const rules = [doubleNegation, idempotent, absorcion, deMorgan, identidad, dominancia, asociativa, distributiva];

  for (let iter = 0; iter < maxIterations; iter++) {
    let changed = false;
    for (const fn of rules) {
      try {
        const out = fn(current);
        if (out && typeof out === 'string') {
          const cleaned = stripParens(out);
          if (cleaned !== current) {
            steps.push({ name: fn.name || 'rule', before: current, after: cleaned });
            current = cleaned;
            changed = true;
            break; // restart rules from first
          }
        }
      } catch (e) {
        // ignore law errors
      }
    }
    if (!changed) break;
  }

  // After applying syntactic laws, check for contradiction/tautology using truth table
  try {
    // fast heuristics
    const c = contradiccion(current);
    const t = tautologia(current);
    if (c) return { result: 'F', steps };
    if (t) return { result: 'V', steps };

    // fallback to truth table for more general detection
    const table = generateTruthTable(current);
    if (table && table.length > 0) {
      const allTrue = table.every(r => Boolean(r.result));
      const allFalse = table.every(r => !r.result);
      if (allTrue) return { result: 'V', steps };
      if (allFalse) return { result: 'F', steps };
    }
  } catch (e) {
    // ignore
  }

  return { result: current, steps };
}

/**
 * Ley de Idempotencia
 * A ∨ A ≡ A, A ∧ A ≡ A
 */
export function idempotent(expr) {
  const e = stripParens(expr);
  // match single variable duplicates or parenthesized duplicates
  if (/^([A-Z])∨\1$/.test(e)) return e[0];
  if (/^\(([A-Z])∨\1\)$/.test(expr)) return expr.replace(/[()]/g,'').charAt(0);
  if (/^([A-Z])∧\1$/.test(e)) return e[0];
  if (/^\(([A-Z])∧\1\)$/.test(expr)) return expr.replace(/[()]/g,'').charAt(0);
  return null;
}

/**
 * Doble negación
 * ¬¬A ≡ A
 */
export function doubleNegation(expr) {
  const e = expr.replace(/\s+/g, '');
  if (/^¬¬([A-Z])$/.test(e)) return e.slice(2);
  if (/^¬\(¬([A-Z])\)$/.test(e)) {
    const m = e.match(/^¬\(¬([A-Z])\)$/);
    return m ? m[1] : null;
  }
  return null;
}

/**
 * Implication equivalence
 * A → B ≡ ¬A ∨ B
 */
export function implication(expr) {
  const e = stripParens(expr);
  const parts = splitTop(e, '→');
  if (parts && parts.length === 2) {
    const [l, r] = parts;
    const left = l.length > 1 ? `(${l})` : l;
    const right = r.length > 1 ? `(${r})` : r;
    return `¬${left} ∨ ${right}`;
  }
  return null;
}

/**
 * Biconditional equivalence
 * A ↔ B ≡ (A ∧ B) ∨ (¬A ∧ ¬B)
 */
export function biconditional(expr) {
  const e = stripParens(expr);
  const parts = splitTop(e, '↔');
  if (parts && parts.length === 2) {
    const [l, r] = parts;
    const left = l.length > 1 ? `(${l})` : l;
    const right = r.length > 1 ? `(${r})` : r;
    return `(${left} ∧ ${right}) ∨ (¬${left} ∧ ¬${right})`;
  }
  return null;
}
