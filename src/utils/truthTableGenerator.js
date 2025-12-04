import { parseExpression } from "./expressionParser";

/**
 * Generates a truth table for a given logical expression.
 * @param {string} expression - The logical expression to evaluate.
 * @returns {Array} - The truth table as an array of objects.
 */
export default function generateTruthTable(expression, variablesList = null) {
  // variablesList: optional array of variable names to use for the table (ensures consistent table size
  // when comparing multiple expressions). If not provided, extract variables from the expression.
  const parsedExpression = parseExpression(expression);
  let variables = [];

  if (Array.isArray(variablesList) && variablesList.length > 0) {
    variables = variablesList.slice();
  } else {
    const matches = expression.match(/[A-Z]/g) || [];
    variables = Array.from(new Set(matches));
  }

  // Sort variables for deterministic column order
  variables.sort();

  const numRows = Math.pow(2, Math.max(variables.length, 0));
  const truthTable = [];

  for (let i = 0; i < numRows; i++) {
    const row = {};
    variables.forEach((variable, index) => {
      row[variable] = Boolean((i >> (variables.length - index - 1)) & 1);
    });

    try {
      // parsedExpression expects an object with variable keys
      row.result = Boolean(parsedExpression(row));
    } catch (error) {
      row.result = false;
    }

    truthTable.push(row);
  }

  return truthTable;
}