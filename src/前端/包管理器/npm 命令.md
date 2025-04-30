---
tags:
  - nodejs
  - npm
createDateTime: 2025-01-23 16:48:13
publish: true
---

# npm 命令

## 查看当前源

```shell
npm config get registry
```

## 更换国内镜像源

### Linux

```shell
# Node.js镜像  
npm config set registry https://registry.npmmirror.com

# 还原默认源  
npm config set registry https://registry.npmjs.org/
```

### Windows

```shell
# Node.js镜像  
npm config set registry=https://registry.npmmirror.com

# 还原默认源  
npm config set registry=https://registry.npmjs.org/
```