// Pure scoring helpers for client-specific QA forms. They take a form object
// (as served by /qa_ai_new/dynamic_client_forms) and the user's responses.

function isNumericString(str) {
  return (
    typeof str === "string" && !isNaN(Number(str)) && !isNaN(parseFloat(str))
  );
}
function isPlainObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

export function calculateSectionScore(
  section,
  responses,
  includedQuestions
) {
  let current = 0;
  let total = 0;

  section.questions.forEach((question) => {
    const isIncluded = question.isOptional
      ? includedQuestions[question.id]
        ? includedQuestions[question.id]
        : false
      : true;

    if (isIncluded) {
      total += question.points;
      const response = responses[question.id];
      if (response) {
        if (isNumericString(response)) {
          current += Number.parseFloat(response);
        } else if (isPlainObject(response)) {
          current += Number.parseFloat(response.value);
        } else if (response.length > 70) {
          current += Number.parseFloat(question.points);
        }
      }
    }
  });

  return { current, total };
}

// Zero-tolerance / auto-fail checklist (currently only Gamer Supps).
// Each question's response carries a negative point value ("No" = -10,
// etc.) when it represents a violation — this sums those and returns a
// positive deduction. Forms without an autoFailSection (every other
// client today) never call this.
export function calculateAutoFailDeduction(autoFailSection, responses) {
  if (!autoFailSection) return 0;

  let deduction = 0;
  autoFailSection.questions.forEach((question) => {
    const response = responses[question.id];
    if (!response) return;

    let numericValue;
    if (isNumericString(response)) {
      numericValue = Number.parseFloat(response);
    } else if (isPlainObject(response)) {
      numericValue = Number.parseFloat(response.value);
    }

    if (!Number.isNaN(numericValue) && numericValue < 0) {
      deduction += Math.abs(numericValue);
    }
  });

  return deduction;
}

export function calculateTotalFormScore(
  formType,
  responses,
  includedQuestions
) {
  let totalCurrent = 0;
  let totalPossible = 0;

  formType.sections.forEach((section) => {
    const { current, total } = calculateSectionScore(
      section,
      responses,
      includedQuestions
    );
    totalCurrent += current;
    totalPossible += total;
  });

  // Auto-fail deductions reduce the earned score only — the max stays the
  // same, so a violation actually lowers the percentage instead of being
  // invisible. Clamped at 0 rather than allowing a negative score.
  if (formType.autoFailSection) {
    const deduction = calculateAutoFailDeduction(
      formType.autoFailSection,
      responses
    );
    totalCurrent = Math.max(0, totalCurrent - deduction);
  }

  return { current: totalCurrent, total: totalPossible };
}
