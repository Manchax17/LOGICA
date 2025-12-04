/**
 * Validates the syntax of a logical expression.
 * @param {string} expression - The logical expression to validate.
 * @returns {boolean} - True if the expression is valid, false otherwise.
 */
export default function validateExpression(expression) {
  const validCharacters = /^[A-Z∧∨⊕→↔¬↑↓()\s]+$/; // Added ↑ and ↓ to the regex
  const balancedParentheses = (expr) => {
    let count = 0;
    for (const char of expr) {
      if (char === '(') count++;
      if (char === ')') count--;
      if (count < 0) return false;
    }
    return count === 0;
  };

  return validCharacters.test(expression) && balancedParentheses(expression);
}