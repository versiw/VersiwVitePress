import fs from 'node:fs'
import { join, relative, resolve } from 'node:path'

export const getFirstFileFormRelativeSrcDir = (relativeSrcDir: string, debug: boolean = false) => {
  try {
    const srcDir = resolve(__dirname, '../../src')
    const fullPath = resolve(srcDir, relativeSrcDir)
    // 读取目录内容
    const files = fs.readdirSync(fullPath)

    // 遍历文件，返回第一个文件（排除子目录）
    for (const file of files) {
      const fileFullPath = join(fullPath, file)
      const stat = fs.statSync(fileFullPath) // 获取文件状态

      if (stat.isFile()) {
        // 如果是文件
        if (debug) {
          console.log(`getFirstFileFormRelativeSrcDir: ${fileFullPath}`)
        }
        return relative(srcDir, fileFullPath).replace(/\\/g, '/')
      }
    }

    return null // 没有文件
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`)
    return null
  }
}
