import React, { useState } from 'react';
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

const ConjunctionDisplay = ({ propositions, operator = 'and', language = 'es' }) => {
  const [currentConjunction, setCurrentConjunction] = useState('');

  const trueSymbol = language === 'en' ? 'T' : 'V';
  const falseSymbol = language === 'en' ? 'F' : 'F';
  const opSymbol = symbolForOperator(operator);

  const createNaturalConjunction = (p, q, r, op, lang) => {
    const clean = s => (s || '').replace(/["']/g, '');
    const cp = clean(p), cq = clean(q), cr = clean(r);
    if (lang === 'en') {
      const word = op === 'and' ? 'and' : op === 'or' ? 'or' : op === 'condicional' ? 'then' : 'iff';
      return `${cp} ${word} ${cq} ${word} ${cr}`;
    } else {
      const word = op === 'and' ? 'y' : op === 'or' ? 'o' : op === 'condicional' ? 'entonces' : 'si y solo si';
      return `${cp} ${word} ${cq} ${word} ${cr}`;
    }
  };

  return (
    <section className="conjunction-display">
      <h3>{getText('conjunctionDisplay.title', language)}</h3>
      <div className="conjunction-content">
        <div className="proposition-display">
          <div className="prop-item">
            <span className="prop-symbol">P =</span>
            <span className="prop-text">{(propositions.p.text || '').replace(/["']/g, '')}</span>
            <span className={`prop-value ${propositions.p.truth ? 'true' : 'false'}`}>
              {propositions.p.truth ? trueSymbol : falseSymbol}
            </span>
          </div>
          <div className="prop-item">
            <span className="prop-symbol">Q =</span>
            <span className="prop-text">{(propositions.q.text || '').replace(/["']/g, '')}</span>
            <span className={`prop-value ${propositions.q.truth ? 'true' : 'false'}`}>
              {propositions.q.truth ? trueSymbol : falseSymbol}
            </span>
          </div>
          <div className="prop-item">
            <span className="prop-symbol">R =</span>
            <span className="prop-text">{(propositions.r.text || '').replace(/["']/g, '')}</span>
            <span className={`prop-value ${propositions.r.truth ? 'true' : 'false'}`}>
              {propositions.r.truth ? trueSymbol : falseSymbol}
            </span>
          </div>
        </div>

        <div className="natural-conjunction">
          <p>{createNaturalConjunction(propositions.p.text, propositions.q.text, propositions.r.text, operator, language)}</p>
          <p className="symbolic">{`${(propositions.p.text || '').replace(/["']/g,'')} ${opSymbol} ${(propositions.q.text || '').replace(/["']/g,'')} ${opSymbol} ${(propositions.r.text || '').replace(/["']/g,'')}`}</p>
        </div>
      </div>
      {/* IA removida */}
    </section>
  );
};

export default ConjunctionDisplay;
