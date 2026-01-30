export function required<T>(
  v: T,
  message = `Unexpected nullish value`,
): asserts v is NonNullable<T> {
  if (v == null) throw new Error(message);
}

export function truthy<T>(
  v: T,
  message = `Unexpected falsy value`,
): asserts v is NonNullable<T> {
  if (!v) throw new Error(message);
}
