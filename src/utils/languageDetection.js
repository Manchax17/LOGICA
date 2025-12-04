// Detección de idioma
export const detectLanguage = () => {
  // Verificar múltiples fuentes de idioma
  const browserLang = navigator.language || navigator.userLanguage;
  const languages = navigator.languages || [];
  
  // Verifica el lenguaje principal
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  
  // Verifica si es Inglés
  if (browserLang.startsWith('en')) {
    return 'en';
  }
  
  // Checar el array de idiomas
  // esto se hace en chrome://settings/languages

  for (const lang of languages) {
    if (lang.startsWith('es')) {
      return 'es';
    }
    if (lang.startsWith('en')) {
      return 'en';
    }
  }
  
  // CVerificar el idioma del navegador desde varias fuentes
  if (navigator.language.includes('es') || 
      navigator.userLanguage.includes('es') ||
      (navigator.languages && navigator.languages.some(lang => lang.includes('es')))) {
    return 'es';
  }
  
  // Cuando no entra al idioma en inglés entra en que es español
  return 'es';
};

// Configuración del idioma
//Contenido de la página si es en español
export const languageConfig = {
  es: {
    title: 'Tabla de Verdad: P ∧ Q ∧ R',
    description: 'Tabla de verdad completa mostrando todas las combinaciones de P, Q, R y su conjunción. P∧Q∧R es Verdadero solo cuando las tres proposiciones son Verdaderas.',
    inputSection: {
      title: 'Ingresa Tus Proposiciones',
      placeholders: {
        p: 'Ingresa la proposición P (ej., "Hoy es Martes")',
        q: 'Ingresa la proposición Q (ej., "Mañana es Miércoles")',
        r: 'Ingresa la proposición R (ej., "Ayer fue Lunes")'
      },
      trueLabel: 'Verdadero'
    },
    patternInfo: {
      title: 'Patrones de la Tabla de Verdad:',
      patterns: {
        p: { text: 'V V V V F F F F', desc: '(4 Verdadero, 4 Falso)' },
        q: { text: 'V V F F V V F F', desc: '(2 Verdadero, 2 Falso, repetir)' },
        r: { text: 'V F V F V F V F', desc: '(alternando Verdadero/Falso)' }
      }
    },
    truthTable: {
      title: 'Tabla de Verdad',
      summary: 'Conjunciones verdaderas de 8',
      headers: ['Fila', 'P', 'Q', 'R', 'P ∧ Q ∧ R']
    },
    conjunctionDisplay: {
      title: 'Conjunción en Español'
    },
    verification: {
      title: 'Verificación de la Conjunción',
      resultLabel: 'Resultado:',
      logicalLabel: 'Lenguaje Lógico:',
      trueResult: 'VERDADERO',
      falseResult: 'FALSO',
      trueExplanation: 'La conjunción es <strong>VERDADERA</strong> porque todas las proposiciones son verdaderas.',
      falseExplanation: 'La conjunción es <strong>FALSA</strong> porque las proposiciones {falseProps} son falsas.'
    },
    analysis: {
      title: 'Análisis',
      description1: 'La conjunción P ∧ Q ∧ R es <strong>Verdadera</strong> solo cuando todas las tres proposiciones P, Q, y R son <strong>Verdaderas</strong>.',
      description2: 'De la tabla de verdad anterior, podemos ver que P ∧ Q ∧ R es Verdadera en <strong>{trueCount}</strong> de 8 combinaciones posibles.',
      trueRows: 'Filas con conjunciones Verdaderas: {trueRows}',
      noTrueRows: 'No hay filas con conjunciones Verdaderas'
    },
    footer: 'En lógica, una conjunción es verdadera solo cuando todos sus componentes son verdaderos.'
  },
  //--------------------------------
  //Contenido de la página si es en inglés
  //--------------------------------

  en: {
    title: 'Truth Table: P ∧ Q ∧ R',
    description: 'Complete truth table showing all combinations of P, Q, R and their conjunction. P∧Q∧R is True only when all three propositions are True.',
    inputSection: {
      title: 'Enter Your Propositions',
      placeholders: {
        p: 'Enter proposition P (e.g., "Today is Tuesday")',
        q: 'Enter proposition Q (e.g., "Tomorrow is Wednesday")',
        r: 'Enter proposition R (e.g., "Yesterday was Monday")'
      },
      trueLabel: 'True'
    },
    patternInfo: {
      title: 'Truth Table Patterns:',
      patterns: {
        p: { text: 'T T T T F F F F', desc: '(4 True, 4 False)' },
        q: { text: 'T T F F T T F F', desc: '(2 True, 2 False, repeat)' },
        r: { text: 'T F T F T F T F', desc: '(alternating True/False)' }
      }
    },
    truthTable: {
      title: 'Truth Table',
      summary: 'True conjunctions out of 8',
      headers: ['Row', 'P', 'Q', 'R', 'P ∧ Q ∧ R']
    },
    conjunctionDisplay: {
      title: 'Conjunction in English'
    },
    verification: {
      title: 'Conjunction Verification',
      resultLabel: 'Result:',
      logicalLabel: 'Logical Language:',
      trueResult: 'TRUE',
      falseResult: 'FALSE',
      trueExplanation: 'The conjunction is <strong>TRUE</strong> because all propositions are true.',
      falseExplanation: 'The conjunction is <strong>FALSE</strong> because propositions {falseProps} are false.'
    },
    analysis: {
      title: 'Analysis',
      description1: 'The conjunction P ∧ Q ∧ R is <strong>True</strong> only when all three propositions P, Q, and R are <strong>True</strong>.',
      description2: 'From the truth table above, we can see that P ∧ Q ∧ R is True in <strong>{trueCount}</strong> of 8 possible combinations.',
      trueRows: 'Rows with True conjunctions: {trueRows}',
      noTrueRows: 'No rows with True conjunctions'
    },
    footer: 'In logic, a conjunction is true only when all its components are true.'
  }
};

// Obtener el texto para el idioma actual
export const getText = (key, language = 'es') => {
  const keys = key.split('.');
  let text = languageConfig[language];
  
  for (const k of keys) {
    text = text?.[k];
  }
  
  return text || key;
};
