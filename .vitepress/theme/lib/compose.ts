/**
 * 组合多个事件处理函数。
 * 它会返回一个新的函数，当这个新函数被调用时，会依次执行所有传入的原始函数。
 * @param original - 可能已存在的原始处理函数。
 * @param handlers - 要添加的新处理函数数组。
 * @returns 一个包含了所有处理逻辑的新函数。
 */
export function composeHandlers<T extends (...args: any[]) => void>(
  original: T | undefined,
  ...handlers: T[]
): T {
  return ((...args: Parameters<T>) => {
    // 首先执行可能存在的原始函数
    if (original) {
      try {
        original(...args)
      } catch (error) {
        console.error('Error in original handler:', error)
      }
    }
    // 然后依次执行新的处理函数
    handlers.forEach((handler) => {
      try {
        handler(...args)
      } catch (error) {
        console.error('Error in composed handler:', error)
      }
    })
  }) as T
}
