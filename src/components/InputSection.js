import React from 'react';
import { getText } from '../utils/languageDetection';

const InputSection = ({ propositions, updateProposition, operator, setOperator, language = 'es' }) => {
  return (
    <section className="input-section">
      <h3>{getText('inputSection.title', language)}</h3>
      <div className="inputs">
        <div className="statement" data-symbol="P">
          <label className="symbol">P</label>
          <input
            type="text"
            placeholder={getText('inputSection.placeholders.p', language)}
            value={propositions.p.text}
            onChange={(e) => updateProposition('p', 'text', e.target.value)}
          />
          <label className="checkbox">
            <input
              type="checkbox"
              checked={propositions.p.truth}
              onChange={(e) => updateProposition('p', 'truth', e.target.checked)}
            />
            <span>{getText('inputSection.trueLabel', language)}</span>
          </label>
        </div>

        <div className="statement" data-symbol="Q">
          <label className="symbol">Q</label>
          <input
            type="text"
            placeholder={getText('inputSection.placeholders.q', language)}
            value={propositions.q.text}
            onChange={(e) => updateProposition('q', 'text', e.target.value)}
          />
          <label className="checkbox">
            <input
              type="checkbox"
              checked={propositions.q.truth}
              onChange={(e) => updateProposition('q', 'truth', e.target.checked)}
            />
            <span>{getText('inputSection.trueLabel', language)}</span>
          </label>
        </div>

        <div className="statement" data-symbol="R">
          <label className="symbol">R</label>
          <input
            type="text"
            placeholder={getText('inputSection.placeholders.r', language)}
            value={propositions.r.text}
            onChange={(e) => updateProposition('r', 'text', e.target.value)}
          />
          <label className="checkbox">
            <input
              type="checkbox"
              checked={propositions.r.truth}
              onChange={(e) => updateProposition('r', 'truth', e.target.checked)}
            />
            <span>{getText('inputSection.trueLabel', language)}</span>
          </label>
        </div>
      </div>

      <div className="operator-select">
        <label>{getText('inputSection.operatorLabel', language)}</label>
        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          <option value="and">∧ (AND)</option>
          <option value="or">∨ (OR)</option>
          <option value="condicional">→ (Condicional)</option>
          <option value="bicondicional">↔ (Bicondicional)</option>
        </select>
      </div>
    </section>
  );
};

export default InputSection;
