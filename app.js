(function () {
  "use strict";

  /** DOM helpers */
  const $ = (sel) => document.querySelector(sel);
  // Quick existence check: if the legacy DOM structure isn't present, stop.
  // This prevents errors when running the React app or when files are loaded without the expected HTML.
  if (!$("#truth-table-body")) {
    // No legacy DOM found -> do nothing.
    console.warn('Legacy app.js: expected DOM not found; skipping legacy script.');
    return;
  }

  // Input elements
  const pText = $("#p-text");
  const qText = $("#q-text");
  const rText = $("#r-text");
  const pTruth = $("#p-truth");
  const qTruth = $("#q-truth");
  const rTruth = $("#r-truth");

  // Display elements
  const displayPText = $("#display-p-text");
  const displayQText = $("#display-q-text");
  const displayRText = $("#display-r-text");
  const displayPValue = $("#display-p-value");
  const displayQValue = $("#display-q-value");
  const displayRValue = $("#display-r-value");
  const spanishConjunction = $("#spanish-conjunction");

  // Verification elements
  const conjunctionResult = $("#conjunction-result");
  const logicalLanguage = $("#logical-language");
  const explanationText = $("#explanation-text");

  // Truth table elements
  const tbody = $("#truth-table-body");
  const trueCountEl = $("#true-count");
  const analysisCountEl = $("#analysis-count");
  const trueRowsEl = $("#true-rows");

  /** Truth table data with specified patterns */
  const truthTableData = [
    // P: VVVVFFFF, Q: VVFFVVFF, R: VFVFVFVF
    { p: true,  q: true,  r: true  }, // Row 1: V V V
    { p: true,  q: true,  r: false }, // Row 2: V V F
    { p: true,  q: false, r: true  }, // Row 3: V F V
    { p: true,  q: false, r: false }, // Row 4: V F F
    { p: false, q: true,  r: true  }, // Row 5: F V V
    { p: false, q: true,  r: false }, // Row 6: F V F
    { p: false, q: false, r: true  }, // Row 7: F F V
    { p: false, q: false, r: false }  // Row 8: F F F
  ];

  /** Utilities */
  function computeConjunction(p, q, r) {
    return p && q && r;
  }

  function updateSpanishConjunction() {
    const pVal = pText.value.trim() || "Hoy es Martes";
    const qVal = qText.value.trim() || "Mañana es Miércoles";
    const rVal = rText.value.trim() || "Ayer fue Lunes";
    
    const pChecked = pTruth.checked;
    const qChecked = qTruth.checked;
    const rChecked = rTruth.checked;

    // Calculate conjunction result
    const isConjunctionTrue = pChecked && qChecked && rChecked;

    // Update display texts
    displayPText.textContent = pVal;
    displayQText.textContent = qVal;
    displayRText.textContent = rVal;

    // Update display values
    displayPValue.textContent = pChecked ? "V" : "F";
    displayQValue.textContent = qChecked ? "V" : "F";
    displayRValue.textContent = rChecked ? "V" : "F";

    // Update classes for styling
    displayPValue.className = `prop-value ${pChecked ? 'true' : 'false'}`;
    displayQValue.className = `prop-value ${qChecked ? 'true' : 'false'}`;
    displayRValue.className = `prop-value ${rChecked ? 'true' : 'false'}`;

    // Create Spanish conjunction with quotes
    const conjunction = `"${pVal}" Y "${qVal}" Y "${rVal}"`;
    spanishConjunction.textContent = conjunction;

    // Update verification section
    updateVerification(pVal, qVal, rVal, isConjunctionTrue);
  }

  function updateVerification(pVal, qVal, rVal, isTrue) {
    // Update result badge
    conjunctionResult.textContent = isTrue ? "VERDADERO" : "FALSO";
    conjunctionResult.className = `result-badge ${isTrue ? 'true' : 'false'}`;

    // Update logical language
    const logicalText = `"${pVal}" ∧ "${qVal}" ∧ "${rVal}"`;
    logicalLanguage.textContent = logicalText;

    // Update explanation
    if (isTrue) {
      explanationText.innerHTML = 'La conjunción es <strong>VERDADERA</strong> porque todas las proposiciones son verdaderas.';
    } else {
      const falseProps = [];
      if (!pTruth.checked) falseProps.push('P');
      if (!qTruth.checked) falseProps.push('Q');
      if (!rTruth.checked) falseProps.push('R');
      
      explanationText.innerHTML = `La conjunción es <strong>FALSA</strong> porque las proposiciones ${falseProps.join(', ')} son falsas.`;
    }
  }

  function renderTruthTable() {
    const rows = [];
    let trueCount = 0;
    const trueRowNumbers = [];

    truthTableData.forEach((row, index) => {
      const conjunction = computeConjunction(row.p, row.q, row.r);
      if (conjunction) {
        trueCount++;
        trueRowNumbers.push(index + 1);
      }

      rows.push(
        `<tr>` +
          `<td>${index + 1}</td>` +
          `<td><span class="truth-value ${row.p ? 'true' : 'false'}">${row.p ? 'V' : 'F'}</span></td>` +
          `<td><span class="truth-value ${row.q ? 'true' : 'false'}">${row.q ? 'V' : 'F'}</span></td>` +
          `<td><span class="truth-value ${row.r ? 'true' : 'false'}">${row.r ? 'V' : 'F'}</span></td>` +
          `<td><span class="truth-value ${conjunction ? 'true' : 'false'}">${conjunction ? 'V' : 'F'}</span></td>` +
        `</tr>`
      );
    });

    tbody.innerHTML = rows.join("");
    trueCountEl.textContent = trueCount;
    trueCountEl.className = `badge ${trueCount > 0 ? 'true' : 'false'}`;
    analysisCountEl.textContent = trueCount;

    // Show which rows have true conjunctions
    if (trueRowNumbers.length > 0) {
      trueRowsEl.innerHTML = `Filas con conjunciones Verdaderas: ${trueRowNumbers.join(', ')}`;
    } else {
      trueRowsEl.innerHTML = 'No hay filas con conjunciones Verdaderas';
    }
  }

  /** Event listeners */
  [pText, qText, rText, pTruth, qTruth, rTruth].forEach((el) => {
    el.addEventListener("input", updateSpanishConjunction);
    el.addEventListener("change", updateSpanishConjunction);
  });

  // Initialize
  updateSpanishConjunction();
  renderTruthTable();
})();


