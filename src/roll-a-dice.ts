export function rollDice() {
  let min = Math.ceil(1);
  let max = Math.floor(7);
  return Math.floor(Math.random() * (max - min) + min);
}