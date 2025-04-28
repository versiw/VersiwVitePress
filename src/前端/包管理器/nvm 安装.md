---
tags:
  - nodejs
  - nvm
createDateTime: 2025-01-23 16:49:35
publish: true
---

## nvm 是什么

`nvm` 全英文也叫 `node.js version management`，是一个 `node.js` 的版本管理工具。`nvm` 和 `n` 都是 `node.js` 版本管理工具，为了解决 `node.js` 各种版本存在不兼容现象可以通过它可以安装和切换不同版本的 `node.js`。

## nvm 下载

github 下载安装包：[Releases · coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

## 安装目录结构

- nvm 安装总目录
	- nodejs 安装目录
	- nvm 安装目录

## 安装最新版本

安装最新版本并切换至该版本

```shell
nvm install latest
```

```shell
nvm use latest
```

## 设置全局缓存及其他优化配置

### 设置全局缓存位置

安装好并切换至某个版本后，进入 `nodejs` 安装目录（其会指向当前使用的 node 版本目录）

在 node 安装目录下新建两个文件夹：`node_cache` 和 `node_global`

> [!note] 目录含义
> `node_global`：npm install 下载的全局插件
> `node_cache`：node 的缓存

以 `管理员权限` 打开 `cmd` 输入以下命令配置指定文件夹

nvm 安装：

```shell
npm config set prefix "%NVM_SYMLINK%\node_global"
```

```shell
npm config set cache "%NVM_SYMLINK%\node_cache"
```

系统环境变量

新增 `PATH` 变量

变量值：

```txt
%NVM_SYMLINK%\node_global
```

![[nvm 安装-20250418.png]]

> [!note] 注意
> 切换新安装的 `node` 版本后，此时 `nodejs` 目录软连接指向的 `node` 版本目录中并没有 `node_global` 文件夹。
> 
> 所以，运行命令 `npm list -g` 会提示文件夹不存在的错误。
> 
> 需要进行一次全局包的安装即可自动生成 `node_global` 文件夹。
> 
 
### 修改 npm 国内源

```shell
npm config set registry http://registry.npmmirror.com
```

## 参考资料

[nvm文档手册 - nvm是一个nodejs版本管理工具 - nvm中文网](https://nvm.uihtm.com/)

[【nvm】适合小白的 nvm 安装配置教程（Windows版） - 软柠柠吖 - 博客园](https://www.cnblogs.com/rnny/p/17839190.html)

