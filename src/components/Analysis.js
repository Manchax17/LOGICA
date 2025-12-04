import React from 'react';
import { getText } from '../utils/languageDetection';

const Analysis = ({ trueCount, trueRowNumbers, language = 'es' }) => {
  const getTrueRowsText = () => {
    if (trueRowNumbers.length > 0) {
      const template = getText('analysis.trueRows', language);
      return template.replace('{trueRows}', trueRowNumbers.join(', '));
    } else {
      return getText('analysis.noTrueRows', language);
    }
  };

  const description2 = getText('analysis.description2', language).replace('{trueCount}', trueCount);

  return (
    <section className="analysis">
      <h3>{getText('analysis.title', language)}</h3>
      <div className="analysis-content">
        <p dangerouslySetInnerHTML={{ __html: getText('analysis.description1', language) }} />
        <p dangerouslySetInnerHTML={{ __html: description2 }} />
        <div className="true-rows">
          {getTrueRowsText()}
        </div>
      </div>
    </section>
  );
};

export default Analysis;
