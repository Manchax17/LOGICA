import { parseExpression } from './src/utils/expressionParser.js';
const expr = 'P↑P';
const fn = parseExpression(expr);
const variables = ['P'];
const rows = [];
for (let i = 0; i < 2; i++) {
	const row = { P: Boolean(i) };
	rows.push({ ...row, result: fn(row) });
}

console.log('parseExpression -> P values:', rows.map(r => r.P));
console.log('parseExpression -> Results:', rows.map(r => r.result));

// Also test generateTruthTable if importable
try {
	const mod = await import('./src/utils/truthTableGenerator.js');
	const generateTruthTable = mod.default;
	const table = generateTruthTable('P↑P');
	console.log('generateTruthTable results:', table.map(r => r.result));
} catch (e) {
	console.log('generateTruthTable import failed:', e.message);
}