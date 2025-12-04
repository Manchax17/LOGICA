import React from 'react';
import { getText } from '../utils/languageDetection';

const PatternInfo = ({ language = 'es' }) => {
  const patterns = getText('patternInfo.patterns', language);
  
  return (
    <section className="pattern-info">
      <div className="pattern">
        <h3>{getText('patternInfo.title', language)}</h3>
        <div className="pattern-row">
          <span className="symbol">P:</span>
          <span className="pattern-text">{patterns.p.text}</span>
          <span className="pattern-desc">{patterns.p.desc}</span>
        </div>
        <div className="pattern-row">
          <span className="symbol">Q:</span>
          <span className="pattern-text">{patterns.q.text}</span>
          <span className="pattern-desc">{patterns.q.desc}</span>
        </div>
        <div className="pattern-row">
          <span className="symbol">R:</span>
          <span className="pattern-text">{patterns.r.text}</span>
          <span className="pattern-desc">{patterns.r.desc}</span>
        </div>
      </div>
    </section>
  );
};

export default PatternInfo;
