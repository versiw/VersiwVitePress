---
tags:
  - rime
createDateTime: 2025-05-12 22:51:50
publish: true
---

# RIME 中州韵输入法引擎

## 什么是 RIME？

[Rime](https://rime.im/) （中州韵输入法引擎）是一款**跨平台的开源输入法引擎**，它不是一个具体的输入法，而是一个从各种常见键盘输入法中提炼出来的**抽象输入算法框架（引擎）**，通过**配置**可以灵活实现多种输入方案（如拼音、五笔、双拼等）。

根据不同前端适配，又称之为不同的名称

- Windows：小狼毫
- macOS：鼠鬚管
-  Linux/IBus：中州韻

使用上大致体验为：引擎+配置。

引擎根据不同系统官网下载即可，配置多为第三方开源作者提供，可选性就比较多了。通过不同的配置，即可实现各种输入法方案，如全拼、双拼、五笔等。

我需求就比较简单了，中文简体、全拼。

自己写配置是不可能了，短时间内上手使用，肯定得找现成方案。

通过搜索，找到了 [Rime 配置：雾凇拼音 - Dvel's Blog](https://dvel.me/posts/rime-ice/)

## 引擎安装

[RIME | 中州韻輸入法引擎](https://rime.im/)官网根据系统下载即可，我下在的是小狼毫，根据安装提示简单几步点点即可。重点就是用户数据目录选择，由于我习惯将一些常用软件配置放在 `OneDrive` 进行同步，方便切换不同设备也可以得到相同体验，所以我选择放在网盘里进行了用户数据的同步。

暂时不知道会不会存在问题，有的软件在网盘同不上会存在一些异常未知 `BUG`。

## 配置安装

### 雾凇拼音

访问作者 GitHub 项目仓库：[GitHub - iDvel/rime-ice: Rime 配置：雾凇拼音 | 长期维护的简体词库](https://github.com/iDvel/rime-ice?tab=readme-ov-file) ，`Clone` 或者 `Download` 仓库代码。

#### 复制配置

将项目文件夹下除了 `.git` 和 `.github` 外的所有文件复制粘贴到 Rime 用户文件夹下。

后续词库的更新可以通过手动替换几个文件即可，当然也可以通过 `git pull` 的形式拉取，如果是拉取，则保留上述所提的 `.git` 文件夹。

原先默认的 Rime 用户文件夹里的内容可以通通删了，实测没影响。

![[RIME 中州韻輸入法引擎-20250513.png]]

#### 重新部署

右键 Rime 输入法图标，点击 `重新部署`

![[RIME 中州韻輸入法引擎-20250513-1.png | 150]]

#### 修改输入法设定

同样，Rime 输入法图标右键，点击 `输入法设定`，勾选需要的输入方法即可。

![[RIME 中州韻輸入法引擎-20250513-2.png|400]]

## 配置语言模型

添加语言模型，可以让输入法更加智能，适合长文本的输入

### 下载模型

目前 Rime 万象向量词库、万象语法模型长期支持版本正式发布，访问 [Releases · amzxyz/RIME-LMDG](https://github.com/amzxyz/RIME-LMDG/releases) 下载 LTS 版本。

下载好的文件放入 Rime 的 `用户文件夹` 内

### 使用模型

自定义对应输入法的配置文件，文件名后面 `rime_ice.schema.yaml` 的 `schema` 部分，改为 `custom`，即 `rime_ice.custom.yaml` 就为对应的自定义配置文件

我当前使用的是 `雾凇拼音`，所以在 `用户文件夹` 下新建 `rime_ice.custom.yaml`，添加以下内容：

```yaml
patch:
  # 语言模型
  "grammar/language": wanxiang-lts-zh-hans
  "grammar/collocation_max_length": 5
  "grammar/collocation_min_length": 2

  # translator 内加载
  "translator/contextual_suggestions": true
  "translator/max_homophones": 7
  "translator/max_homographs": 7
```

> [!note]
> 语言模型名称后面，无需添加后缀名


最后，`重新部署` 即可。


## 自定义配置

Rime 引擎的文档、输入法方案的配置文档，都挺齐全完善的，雾凇的配置文件注释也是中文的。耐着性子阅读一下，都可以简单配置配置的。

- [幫助與反饋 | RIME | 中州韻輸入法引擎](https://rime.im/docs/)
- [Rime 配置：雾凇拼音 - Dvel's Blog](https://dvel.me/posts/rime-ice/)

> [!note] 注意
> 自定义配置后, 都需要进行 `重新部署`

### 修改候选词个数

编辑 `用户文件夹\default.custom.yaml` 

```yaml
patch:
  schema_list:
    - {schema: rime_ice}

  menu/+:
    page_size: 7  # 候选词个数
```

> [!tip] 提示
>  结尾的 `/+` 表示在原基础上追加

### 修改方案选单快捷键

我的 `Ctrl+` `和我其他功能相冲突了,需要自定义的可以修改

编辑 `用户文件夹\default.custom.yaml` 

```yaml
patch:
  schema_list:
    - {schema: rime_ice}

  # 方案选单相关
  switcher/+:
    hotkeys:
      - F7
```

### 自定义文本

编辑 `用户文件夹\custom_phrase.txt` ,里面有作者预定义好的符合他个人习惯的文本。感觉我应该用不到，所以就都删了。

然后按要求填入自己的自定义文本即可：`以 Tab 分割：词汇<Tab>编码<Tab>权重`

> [!warning] 警告
> 一定要以 Tab 分割!!！

### 自定义皮肤

小狼毫文档：[Weasel 定制化 · rime/weasel Wiki · GitHub](https://github.com/rime/weasel/wiki/Weasel-%E5%AE%9A%E5%88%B6%E5%8C%96)

小狼毫的在线设计网页：[RIME 西米](https://fxliang.github.io/RimeSeeMe/) （小狼毫维护者的）、 [润笔](https://pdog18.github.io/rime-soak/#/theme)

## 常见快捷键

### 降权

降低词库中已有词语的权重（回到原始权重，不是降到最低）

- 小狼毫使用 `Ctrl/Shift + Del`



## 参考文章

[RIME | 中州韻輸入法引擎](https://rime.im/)

[Rime 配置：雾凇拼音 - Dvel's Blog](https://dvel.me/posts/rime-ice/)

[小狼毫&雾凇拼音安装及部署-Windows（图文） - HookDing - 博客园](https://www.cnblogs.com/HookDing/p/17949199)

[GitHub - amzxyz/RIME-LMDG: Rime输入法语法模型全流程构建教程，全局带声调词库，最全声调标注工具链：LMDG - Language, Model, Dictionary, Grammar。Q群：11033572](https://github.com/amzxyz/RIME-LMDG)

[oh-my-rime 输入法 | 薄荷输入法](https://www.mintimate.cc/zh/)

