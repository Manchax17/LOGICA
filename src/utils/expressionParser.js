/**
 * CONVIERTE UNA EXPRESIÓN LÓGICA A UNA FUNCIÓN JAVASCRIPT (EVALUADORA)
 * @param {string} expression - The logical expression to parse.
 * @returns {Function} - A function that evaluates the expression given a truth assignment.
 */
export function parseExpression(expression) {
  let jsExpression = expression
    .replace(/\s+/g, "") //REMUEVE ESPACIOS EN BLANCO
    .replace(/¬/g, "!")  //NEGACION
    .replace(/∧/g, "&&") //CONJUNCION
    .replace(/∨/g, "||") //DISYUNCION
    .replace(/⊕/g, "!==") // XOR
    .replace(/↔/g, "===") // Bicondicional
    .replace(/⊙/g, "==="); // XNOR (nuevo símbolo Unicode)

  // Implication: A → B  => (!A || B)
  jsExpression = jsExpression.replace(/(\([^()]*\)|[A-Z])→(\([^()]*\)|[A-Z])/g, (m, a, b) => `(!(${a}) || (${b}))`);

  // NAND: A ↑ B => !(A && B)
  jsExpression = jsExpression.replace(/(\([^()]*\)|[A-Z])↑(\([^()]*\)|[A-Z])/g, (m, a, b) => `(!(${a} && ${b}))`);
  // NOR: A ↓ B => !(A || B)
  jsExpression = jsExpression.replace(/(\([^()]*\)|[A-Z])↓(\([^()]*\)|[A-Z])/g, (m, a, b) => `(!(${a} || ${b}))`);
  // XNOR: A ⊙ B => (A === B)
  jsExpression = jsExpression.replace(/(\([^()]*\)|[A-Z])⊙(\([^()]*\)|[A-Z])/g, (m, a, b) => `(${a} === ${b})`);

  return (truthAssignment) => {
    const variables = Object.keys(truthAssignment);
    const values = variables.map((v) => truthAssignment[v]);
    const func = new Function(...variables, `return ${jsExpression};`);
    return func(...values);
  };
}