export function randomInt(lowest, highest) {
  return Math.floor(Math.random() * (highest - lowest + 1) + lowest);
}

export function format(n) {
  return n + '°C';
}

export function convert(n) {
  return (n * (9 / 5) + 32).toFixed(2);
}
