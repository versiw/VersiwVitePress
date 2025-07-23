/**
 * 计算字符串的 MurmurHash3 32位哈希值
 * @param key 要计算哈希的字符串
 * @param seed 哈希种子，默认为0
 * @returns 32位无符号整数哈希值
 */
export const murmurHash3_32 = (key: string, seed: number = 0): number => {
  let rem = key.length & 3
  let bytes = key.length - rem
  let h1 = seed
  let c1 = 0xcc9e2d51
  let c2 = 0x1b873593
  let i = 0
  let k1 = 0

  while (i < bytes) {
    k1 =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(++i) & 0xff) << 8) |
      ((key.charCodeAt(++i) & 0xff) << 16) |
      ((key.charCodeAt(++i) & 0xff) << 24)
    i++

    k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
    k1 = (k1 << 15) | (k1 >>> 17)
    k1 = ((k1 & 0xffff) * c2 + ((((k1 >> 16) * c2) & 0xffff) << 16)) & 0xffffffff

    h1 ^= k1
    h1 = (h1 << 13) | (h1 >>> 19)

    const h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff
    h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654) << 16)
  }

  k1 = 0

  switch (rem) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff
      k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
      k1 = (k1 << 15) | (k1 >>> 17)
      k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff
      h1 ^= k1
  }

  h1 ^= key.length

  h1 ^= h1 >>> 16
  h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff
  h1 ^= h1 >>> 13
  h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff
  h1 ^= h1 >>> 16

  return h1 >>> 0
}

/**
 * 将字符串通过MurmurHash3算法计算32位哈希值，并转换为Base62编码字符串
 * @param key 要计算哈希的字符串
 * @param seed 哈希种子(可选)，默认为0
 * @returns Base62编码的哈希字符串
 */
export const murmurHash3_32ToBase62 = (key: string, seed?: number): string => {
  return decimalToBase62(murmurHash3_32(key, seed))
}

/**
 * Base62字符集，包含0-9、a-z、A-Z
 */
const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * 将十进制数字转换为Base62编码字符串
 * @param num 要转换的十进制数字
 * @returns Base62编码字符串
 */
const decimalToBase62 = (num: number): string => {
  if (num === 0) return '0'

  let result = ''
  while (num > 0) {
    const remainder = num % 62
    result = BASE62_CHARS[remainder] + result
    num = (num / 62) | 0
  }

  return result
}
