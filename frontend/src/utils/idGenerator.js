export function generateId(prefix) {
  const hex = Math.random().toString(16).substring(2, 10).padStart(8, "0");
  return `${prefix}${hex}`;
}
