import React, { useState } from 'react';

const SyntaxHelper = ({ proposition, onSuggestionClick, language = 'es' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // AI-powered syntax suggestions for Spanish
  const getSpanishSuggestions = (text) => {
    const suggestions = [];
    
    // Check for common Spanish syntax issues
    if (text.length < 3) {
      suggestions.push({
        type: 'warning',
        message: 'La proposición es muy corta. Intenta ser más específico.',
        suggestion: 'Hoy es lunes'
      });
    }

    // Check for missing capitalization
    if (text.length > 0 && text[0] !== text[0].toUpperCase()) {
      suggestions.push({
        type: 'info',
        message: 'Las proposiciones deben comenzar con mayúscula.',
        suggestion: text.charAt(0).toUpperCase() + text.slice(1)
      });
    }

    // Check for missing punctuation
    if (text.length > 0 && !text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
      suggestions.push({
        type: 'info',
        message: 'Considera agregar un punto al final.',
        suggestion: text + '.'
      });
    }

    // Check for quotes and suggest removal
    if (text.includes('"') || text.includes("'")) {
      const cleanText = text.replace(/["']/g, '');
      suggestions.push({
        type: 'info',
        message: 'Para mejores conjunciones, evita las comillas.',
        suggestion: cleanText
      });
    }

    // Check for common grammar patterns and suggest improvements
    const commonPatterns = [
      {
        pattern: /^(hoy|mañana|ayer|el|la|los|las|un|una|unos|unas)\s/i,
        message: 'Buena estructura temporal o de artículo.',
        type: 'success'
      },
      {
        pattern: /^(es|son|fue|fueron|será|serán)\s/i,
        message: 'Excelente uso del verbo ser.',
        type: 'success'
      },
      {
        pattern: /^(tiene|tienen|tenía|tenían|tendrá|tendrán)\s/i,
        message: 'Buen uso del verbo tener.',
        type: 'success'
      },
      {
        pattern: /^(está|están|estaba|estaban|estará|estarán)\s/i,
        message: 'Buen uso del verbo estar.',
        type: 'success'
      }
    ];

    commonPatterns.forEach(pattern => {
      if (pattern.pattern.test(text)) {
        suggestions.push({
          type: pattern.type,
          message: pattern.message,
          suggestion: text
        });
      }
    });

    // Suggest better sentence structures for conjunctions
    const conjunctionImprovements = [
      {
        pattern: /^hoy es (\w+)$/i,
        suggestion: 'Hoy es $1 y hace buen tiempo',
        message: 'Sugerencia: Agrega más contexto para una mejor conjunción'
      },
      {
        pattern: /^mañana será (\w+)$/i,
        suggestion: 'Mañana será $1 y tendremos una reunión',
        message: 'Sugerencia: Agrega más contexto para una mejor conjunción'
      },
      {
        pattern: /^ayer fue (\w+)$/i,
        suggestion: 'Ayer fue $1 y llovió mucho',
        message: 'Sugerencia: Agrega más contexto para una mejor conjunción'
      }
    ];

    conjunctionImprovements.forEach(improvement => {
      const match = text.match(improvement.pattern);
      if (match) {
        const improved = improvement.suggestion.replace('$1', match[1]);
        suggestions.push({
          type: 'info',
          message: improvement.message,
          suggestion: improved
        });
      }
    });

    // Add some example suggestions for better conjunctions
    const examples = [
      'Hoy es lunes y hace sol',
      'Mañana será martes y tendremos clase',
      'Ayer fue domingo y descansé',
      'El cielo está despejado y es hermoso',
      'La temperatura es alta y hace calor',
      'Los estudiantes están en clase y aprenden',
      'Las flores son hermosas y perfumadas',
      'Hoy llueve y hace frío',
      'Mañana será soleado y caluroso',
      'Ayer nevó y estaba helado'
    ];

    if (suggestions.length === 0) {
      suggestions.push({
        type: 'info',
        message: 'Ejemplos de proposiciones que forman buenas conjunciones:',
        suggestion: examples[Math.floor(Math.random() * examples.length)]
      });
    }

    return suggestions;
  };

  // AI-powered syntax suggestions for English
  const getEnglishSuggestions = (text) => {
    const suggestions = [];
    
    // Check for common English syntax issues
    if (text.length < 3) {
      suggestions.push({
        type: 'warning',
        message: 'The proposition is too short. Try to be more specific.',
        suggestion: 'Today is Monday'
      });
    }

    // Check for missing capitalization
    if (text.length > 0 && text[0] !== text[0].toUpperCase()) {
      suggestions.push({
        type: 'info',
        message: 'Propositions should start with a capital letter.',
        suggestion: text.charAt(0).toUpperCase() + text.slice(1)
      });
    }

    // Check for missing punctuation
    if (text.length > 0 && !text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
      suggestions.push({
        type: 'info',
        message: 'Consider adding a period at the end.',
        suggestion: text + '.'
      });
    }

    // Check for quotes and suggest removal
    if (text.includes('"') || text.includes("'")) {
      const cleanText = text.replace(/["']/g, '');
      suggestions.push({
        type: 'info',
        message: 'For better conjunctions, avoid quotes.',
        suggestion: cleanText
      });
    }

    // Check for common grammar patterns and suggest improvements
    const commonPatterns = [
      {
        pattern: /^(today|tomorrow|yesterday|the|a|an)\s/i,
        message: 'Good temporal or article structure.',
        type: 'success'
      },
      {
        pattern: /^(is|are|was|were|will be)\s/i,
        message: 'Excellent use of the verb to be.',
        type: 'success'
      },
      {
        pattern: /^(has|have|had|will have)\s/i,
        message: 'Good use of the verb to have.',
        type: 'success'
      },
      {
        pattern: /^(is|are|was|were|will be)\s/i,
        message: 'Good use of the verb to be.',
        type: 'success'
      }
    ];

    commonPatterns.forEach(pattern => {
      if (pattern.pattern.test(text)) {
        suggestions.push({
          type: pattern.type,
          message: pattern.message,
          suggestion: text
        });
      }
    });

    // Suggest better sentence structures for conjunctions
    const conjunctionImprovements = [
      {
        pattern: /^today is (\w+)$/i,
        suggestion: 'Today is $1 and it is sunny',
        message: 'Suggestion: Add more context for a better conjunction'
      },
      {
        pattern: /^tomorrow will be (\w+)$/i,
        suggestion: 'Tomorrow will be $1 and we have a meeting',
        message: 'Suggestion: Add more context for a better conjunction'
      },
      {
        pattern: /^yesterday was (\w+)$/i,
        suggestion: 'Yesterday was $1 and it rained a lot',
        message: 'Suggestion: Add more context for a better conjunction'
      }
    ];

    conjunctionImprovements.forEach(improvement => {
      const match = text.match(improvement.pattern);
      if (match) {
        const improved = improvement.suggestion.replace('$1', match[1]);
        suggestions.push({
          type: 'info',
          message: improvement.message,
          suggestion: improved
        });
      }
    });

    // Add some example suggestions for better conjunctions
    const examples = [
      'Today is Monday and it is sunny',
      'Tomorrow will be Tuesday and we have class',
      'Yesterday was Sunday and I rested',
      'The sky is clear and beautiful',
      'The temperature is high and it is hot',
      'The students are in class and learning',
      'The flowers are beautiful and fragrant',
      'Today it is raining and cold',
      'Tomorrow will be sunny and warm',
      'Yesterday it snowed and was freezing'
    ];

    if (suggestions.length === 0) {
      suggestions.push({
        type: 'info',
        message: 'Examples of propositions that form good conjunctions:',
        suggestion: examples[Math.floor(Math.random() * examples.length)]
      });
    }

    return suggestions;
  };

  const handleAnalyze = async () => {
    if (!proposition.trim()) return;
    
    setIsLoading(true);
    setIsOpen(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const suggestions = language === 'es' 
      ? getSpanishSuggestions(proposition)
      : getEnglishSuggestions(proposition);
    
    setSuggestions(suggestions);
    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="syntax-helper">
      <button 
        className="syntax-helper-button"
        onClick={handleAnalyze}
        disabled={!proposition.trim()}
        title={language === 'es' ? 'Analizar sintaxis con IA' : 'Analyze syntax with AI'}
      >
        {language === 'es' ? '🔍 IA' : '🔍 AI'}
      </button>
      
      {isOpen && (
        <div className="syntax-suggestions">
          <div className="suggestions-header">
            <h4>{language === 'es' ? 'Sugerencias de IA' : 'AI Suggestions'}</h4>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          
          {isLoading ? (
            <div className="loading">
              {language === 'es' ? 'Analizando...' : 'Analyzing...'}
            </div>
          ) : (
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div key={index} className={`suggestion-item ${suggestion.type}`}>
                  <div className="suggestion-message">
                    {suggestion.message}
                  </div>
                  {suggestion.suggestion && (
                    <button
                      className="suggestion-button"
                      onClick={() => handleSuggestionClick(suggestion.suggestion)}
                    >
                      {language === 'es' ? 'Usar' : 'Use'}: "{suggestion.suggestion}"
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SyntaxHelper;
