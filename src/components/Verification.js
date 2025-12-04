import React from 'react';
import { getText } from '../utils/languageDetection';

const symbolForOperator = (op) => {
  switch (op) {
    case 'and': return '∧';
    case 'or': return '∨';
    case 'condicional': return '→';
    case 'bicondicional': return '↔';
    default: return '';
  }
};

const Verification = ({ propositions, isConjunctionTrue, operator = 'and', language = 'es' }) => {
  const createNaturalLogicalText = (p, q, r, op) => {
    const clean = s => s.replace(/["']/g, '');
    const symbol = symbolForOperator(op);
    return `${clean(p)} ${symbol} ${clean(q)} ${symbol} ${clean(r)}`;
  };

  const logicalText = createNaturalLogicalText(
    propositions.p.text,
    propositions.q.text,
    propositions.r.text,
    operator
  );

  const explanation = () => {
    if (operator === 'and') {
      return getText('verification.explainAnd', language) || 'La expresión es verdadera solo si todas las proposiciones son verdaderas.';
    } else if (operator === 'or') {
      return getText('verification.explainOr', language) || 'La expresión es verdadera si al menos una proposición es verdadera.';
    } else if (operator === 'condicional') {
      return getText('verification.explainCond', language) || 'Interpreta la condicional como (P → Q) ∧ (Q → R).';
    } else {
      return getText('verification.explainBicond', language) || 'La bicondicional es verdadera cuando todas las proposiciones tienen el mismo valor de verdad.';
    }
  };

  return (
    <section className="verification">
      <h3>{getText('verification.title', language)}</h3>
      <div className="verification-content">
        <div className="result-display">
          <div className="result-item">
            <span className="result-label">{getText('verification.resultLabel', language)}</span>
            <span className={`result-badge ${isConjunctionTrue ? 'true' : 'false'}`}>
              {isConjunctionTrue ? getText('verification.trueResult', language) : getText('verification.falseResult', language)}
            </span>
          </div>
          <div className="result-item">
            <span className="result-label">{getText('verification.logicalLabel', language)}</span>
            <span className="logical-text">{logicalText}</span>
          </div>
        </div>

        <div className="explanation">
          <p>{explanation()}</p>
        </div>
      </div>
    </section>
  );
};

export default Verification;
