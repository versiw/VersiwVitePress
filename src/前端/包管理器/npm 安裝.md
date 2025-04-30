---
tags:
  - npm
  - nodejs
createDateTime: 2025-01-23 16:48:13
publish: true
---

# npm 安裝

## Ubuntu 安裝

### 更新软件包列表

在终端中执行以下命令，确保你的软件包列表是最新的


```shell
sudo apt update
```

```shell
sudo apt upgrade
```

### 安装 node. js 和 npm

Ubuntu 软件仓库中通常会包含 Node. js 和 npm 的版本，你可以直接从仓库安装它们。执行以下命令来安装 Node. js 和 npm

```shell
sudo apt install nodejs npm
```

### 清除 npm 缓存

```shell
npm cache clean -f
```

### 更新 node

n 模块是专门用来管理 nodejs 的版本，通过它可以升级 node 的版本，但 win 系统下不太适用。

全局安装 n

```shell
sudo npm install n -g -y
```

升级到最新稳定版

```shell
sudo n stable
```

升级到最新版

```shell
sudo n latest
```

### 更新 npm

升级到最新版本

```shell
npm install npm -g
```

升级到指定版本

```shell
npm install npm@6.14.13 -g
```

### 验证安装

```shell
node -v
npm -v
```


## Windows 安装

### 官网下载安装包

[Node.js — Run JavaScript Everywhere](https://nodejs.org/en)

### 修改缓存空间

在 node 安装目录下新建两个文件夹：`node_cache` 和 `node_global`


> [!note] 目录含义
> `node_global`：npm install 下载的全局插件
> `node_cache`：node 的缓存


以 `管理员权限` 打开 `cmd` 输入以下命令配置指定文件夹

普通 nodejs 安装：

```shell
npm config set prefix "{{node安装路径}}\node_global"
```

```shell
npm config set cache "{{node安装路径}}\node_cache"
```

nvm 安装：

```shell
npm config set prefix "%NVM_SYMLINK%\node_global"
```

```shell
npm config set cache "%NVM_SYMLINK%\node_cache"
```

### 配置环境变量

 - 在 `系统变量` 中新建名为 `NODE_PATH` 的环境变量

变量名：`NODE_PATH`
变量值：`{{node安装路径}}\node_global\node_modules

- 编辑 `用户变量` 中的 `Path`

将 `{{用户目录}}\AppData\Roaming\npm` 更改为 `{{node安装路径}}\node_global`

将 `%NODE_PATH%` 添加至 `系统变量` 的 `Path` 中

`系统变量` 中添加 `node` 安装目录 

### 更改文件夹权限

如果使用 `npm install` 出现错误：`npm ERR! Error: EPERM: operation not permitted, mkdir 'G:\nodejs\node_cache\_cacache'`

应该是 Node. js 安装时是给用户安装了，没有管理员权限，给安装目录赋予管理员权限即可

![[npm 安裝-20250418-1.png|300]]

![[npm 安裝-20250418-2.png|300]]
