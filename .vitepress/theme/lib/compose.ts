export function composeHandlers<T extends (...args: any[]) => void>(
  original: T | undefined,
  ...handlers: T[]
): T {
  return ((...args: Parameters<T>) => {
    if (original) original(...args)
    handlers.forEach((handler) => handler(...args))
  }) as T
}
