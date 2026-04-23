export function calculateScore({ trackers }) {
  let score = 100;

  score -= trackers.length * 15;

  if (score < 0) score = 0;

  return score;
}