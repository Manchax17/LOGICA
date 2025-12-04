/**
 * Parses a logical expression into a JavaScript function.
 * @param {string} expression - The logical expression to parse.
 * @returns {Function} - A function that evaluates the expression given a truth assignment.
 */
export function parseExpression(expression) {
  // Normalize and transform to a valid JS boolean expression.
  // We handle binary operators between either single variables or simple parenthesized subexpressions.
  let jsExpression = expression
    .replace(/\s+/g, "") // remove whitespace to simplify matching
    .replace(/¬/g, "!")
    .replace(/∧/g, "&&")
    .replace(/∨/g, "||")
    .replace(/⊕/g, "!==")
    .replace(/↔/g, "===");

  // Implication: A → B  => (!A || B)
  jsExpression = jsExpression.replace(/(\([^()]*\)|[A-Z])→(\([^()]*\)|[A-Z])/g, (m, a, b) => `(!(${a}) || (${b}))`);

  // NAND and NOR: handle operands that are single variables or parenthesized expressions
  jsExpression = jsExpression.replace(/(\([^()]*\)|[A-Z])↑(\([^()]*\)|[A-Z])/g, (m, a, b) => `(!(${a} && ${b}))`);
  jsExpression = jsExpression.replace(/(\([^()]*\)|[A-Z])↓(\([^()]*\)|[A-Z])/g, (m, a, b) => `(!(${a} || ${b}))`);

  return (truthAssignment) => {
    const variables = Object.keys(truthAssignment);
    const values = variables.map((v) => truthAssignment[v]);

    const func = new Function(...variables, `return ${jsExpression};`);
    return func(...values);
  };
}