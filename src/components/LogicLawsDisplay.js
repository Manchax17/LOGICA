import React, { useState } from 'react';
import {
  deMorgan,
  identidad,
  dominancia,
  absorcion,
  asociativa,
  distributiva,
  contradiccion,
  tautologia
} from '../utils/logicLaws';
import { idempotent, doubleNegation, implication, biconditional } from '../utils/logicLaws';
import generateTruthTable from '../utils/truthTableGenerator';
import { simplify } from '../utils/logicLaws';

const lawFunctions = [
  { name: 'De Morgan', fn: deMorgan },
  { name: 'Identidad', fn: identidad },
  { name: 'Dominancia', fn: dominancia },
  { name: 'Absorción', fn: absorcion },
  { name: 'Idempotencia', fn: idempotent },
  { name: 'Doble Negación', fn: doubleNegation },
  { name: 'Asociativa', fn: asociativa },
  { name: 'Distributiva', fn: distributiva },
  { name: 'Implicación', fn: implication },
  { name: 'Bicondicional', fn: biconditional },
];

export default function LogicLawsDisplay() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [classification, setClassification] = useState(null);
  const [simplified, setSimplified] = useState(null);
  const [simplSteps, setSimplSteps] = useState([]);

  const stepLabel = (name) => {
    const map = {
      'doubleNegation': 'Doble Negación',
      'idempotent': 'Idempotencia',
      'absorcion': 'Absorción',
      'deMorgan': 'De Morgan',
      'identidad': 'Identidad',
      'dominancia': 'Dominancia',
      'asociativa': 'Asociativa',
      'distributiva': 'Distributiva',
      'implication': 'Implicación',
      'biconditional': 'Bicondicional',
      'Expand Implication': 'Expandir Implicación',
      'Expand Biconditional': 'Expandir Bicondicional'
    };
    return map[name] || name;
  };

  const handleCheckLaws = () => {
    const normalized = (input || '').replace(/\s+/g, '');
    const res = [];
    // run through functions including new ones
    for (const law of [...lawFunctions]) {
      const r = law.fn(normalized);
      if (r) res.push({ name: law.name, result: r });
    }
    // check contradiction/tautology (imported above)
    try {
      const c = contradiccion(normalized);
      const t = tautologia(normalized);
      if (c) res.push({ name: 'Contradicción', result: c });
      if (t) res.push({ name: 'Tautología', result: t });
    } catch (e) {
      // ignore unexpected errors in heuristics
    }

    // classification: use truth table to decide tautology / contradiction / contingency
    let cls = null;
    try {
      const table = generateTruthTable(normalized);
      if (table.length > 0) {
        const allTrue = table.every(r => Boolean(r.result));
        const allFalse = table.every(r => !r.result);
        if (allTrue) cls = 'tautology';
        else if (allFalse) cls = 'contradiction';
        else cls = 'contingency';
      }
    } catch (e) {
      // keep cls null if table generation fails
    }

    setClassification(cls);
    setResults(res);

    // compute simplification and present final result + steps
    try {
      const out = simplify(normalized);
      if (out && out.result) setSimplified(out.result);
      else setSimplified(null);
      setSimplSteps(Array.isArray(out.steps) ? out.steps : []);
    } catch (e) {
      setSimplified(null);
      setSimplSteps([]);
    }
  };

  const operators = [
    { sym: '∧', title: 'AND' },
    { sym: '∨', title: 'OR' },
    { sym: '⊕', title: 'XOR' },
    { sym: '→', title: 'IMPLIES' },
    { sym: '↔', title: 'IFF' },
    { sym: '¬', title: 'NOT' },
    { sym: '(', title: '(' },
    { sym: ')', title: ')' },
    { sym: '↑', title: 'NAND' },
    { sym: '↓', title: 'NOR' },
    { sym: '⊙', title: 'XNOR' }
  ];

  const insertOp = (op) => {
    setInput((s) => (s || '') + op);
  };

  return (
    <section className="input-section logic-laws-display">
      <h3>Leyes de la Lógica Proposicional</h3>

      <div className="expr-input">
        <label>Introduce la expresión</label>
        <div className="expr-bar">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.toUpperCase())}
            placeholder="Ejemplo: ¬(A∧B)"
          />

          <div className="op-buttons" style={{ marginTop: 8 }}>
            {operators.map((o) => (
              <button key={o.sym} onClick={() => insertOp(o.sym)} title={o.title}>
                <span className="op-symbol">{o.sym}</span>
                <span className="op-title">{o.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 8, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="ai-button" onClick={handleCheckLaws}>Aplicar Leyes</button>
        {classification && (
          <div className={`classification ${classification === 'tautology' ? 'tautology' : classification === 'contradiction' ? 'contradiction' : 'contingency'}`}>
            {classification === 'tautology' ? 'Tautología' : classification === 'contradiction' ? 'Falacia / Contradicción' : 'Contingencia'}
          </div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--accent)' }}>Leyes aplicables</h4>
        {results.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>No se detectó ninguna ley aplicable.</p>
        ) : (
          <ul>
            {results.map((r, i) => (
              <li key={i}><strong>{r.name}:</strong> {r.result}</li>
            ))}
          </ul>
        )}
        {simplified && (
          <div style={{ marginTop: 12 }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--accent)' }}>Resultado simplificado</h4>
            <div className="conjunction-result" style={{ display: 'inline-block' }}>{simplified}</div>
          </div>
        )}
        {simplSteps && simplSteps.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--accent)' }}>Pasos de simplificación</h4>
            <ol>
              {simplSteps.map((s, i) => (
                <li key={i} style={{ marginBottom: 8 }}>
                  <strong>{stepLabel(s.name)}:</strong>
                  <div style={{ color: 'var(--muted)', fontFamily: 'ui-monospace, monospace' }}>{s.before} → {s.after}</div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <small style={{ display: 'block', marginTop: 12, color: 'var(--muted)' }}>Ejemplos válidos: ¬(A∧B), A∨(A∧B), A∧(B∨C), etc.</small>
    </section>
  );
}
