export function calculateScore({ trackers }) {
  let score = 100;

  score -= trackers.length * 10;

  return Math.max(score, 0);
}