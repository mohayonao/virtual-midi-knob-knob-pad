export function clamp(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
}

export function linlin(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}
