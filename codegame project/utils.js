// utils.js — Pure helper functions for Code or Crash

/**
 * Fisher-Yates shuffle — returns a new shuffled array
 * @param {Array} arr
 * @returns {Array}
 */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Calculate score for a correct answer given remaining time
 * @param {number} timeLeft  seconds remaining (0–20)
 * @returns {number}
 */
export function calcScore(timeLeft) {
  return 100 + timeLeft * 5;
}

/**
 * Get letter grade and CSS class from accuracy percentage
 * @param {number} accuracy  0–100
 * @returns {{ grade: string, cls: string }}
 */
export function getGrade(accuracy) {
  if (accuracy >= 90) return { grade: 'A+', cls: 'grade-A' };
  if (accuracy >= 80) return { grade: 'A',  cls: 'grade-A' };
  if (accuracy >= 70) return { grade: 'B',  cls: 'grade-B' };
  if (accuracy >= 60) return { grade: 'C',  cls: 'grade-C' };
  if (accuracy >= 50) return { grade: 'D',  cls: 'grade-D' };
  return { grade: 'F', cls: 'grade-F' };
}

/**
 * Calculate accuracy as a percentage (0–100, integer)
 * @param {number} correct
 * @param {number} total
 * @returns {number}
 */
export function calcAccuracy(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Shuffle an array of option indices and return
 * { shuffledOpts, shuffledIndices }
 * so we can track which original index maps where
 * @param {string[]} opts original options array
 * @returns {{ shuffledOpts: string[], shuffledIndices: number[] }}
 */
export function shuffleOptions(opts) {
  const indices = shuffle([0, 1, 2, 3]);
  const shuffledOpts = indices.map(i => opts[i]);
  return { shuffledOpts, shuffledIndices: indices };
}
