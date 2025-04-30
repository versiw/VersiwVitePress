---
tags:
  - hadoop
  - sqoop
createDateTime: 2025-04-26 09:27:47
publish: true
---

# Hadoop大数据平台组件搭建系列 2 —— Sqoop组件配置

## 简介

本篇介绍关于 Hadoop 大数据平台组件中**sqoop**组件的搭建

软件版本信息：

 [sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz](http://mirrors.hust.edu.cn/apache/sqoop/1.4.7/sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz)
 
 [mysql-connector-java-5.1.47（mysql连接jar包）](https://pan.baidu.com/s/1CHBRZG401-ViWMxpcEI-bw)（百度云提取码：vk6v）

## Sqoop 安装

### 解压 sqoop 安装包至目标文件夹
 
```powershell
tar -zxvf /opt/software/sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz -C /usr/local/scr/
```

### 修改环境变量，并是环境变量生效


```powershell
vi /etc/profile
```

添加 sqoop 环境变量如下：

```powershell
#.....sqoop.....
export SQOOP_HOME=/usr/local/scr/sqoop
export PATH=$PATH:$SQOOP_HOME/bin
```

使环境变量生效

```powershell
source /etc/profile
```

### 修改 sqoop-env. sh 配置文件

复制 sqoop-env-template. sh 文件改名为 sqoop-env. sh

```powershell
cp sqoop-env-template.sh sqoop-env.sh
```

修改 sqoop-env. sh 配置文件，添加您所拥有的文件路径（**注意前面的 #注释符号 **），没有的可以不填！

```powershell
vi sqoop-env.sh
```

![[Hadoop大数据平台组件搭建系列 2 —— Sqoop组件配置-20250420.png]]

### 将 jdbc 驱动包放入 sqoop 的 lib 中（链接 Mysql 时使用）
 
```powershell
cp /opt/software/mysql-connector-java-5.1.47.jar /usr/local/scr/sqoop/lib/
```

### 测试链接 Mysql，查看数据库

```powershell
sqoop list-databases --connect jdbc:mysql://master1:3306/ --username root --password 000000
```

## 系列文章

[[Linux中实现Hadoop各节点间的SSH免密登录]]

[[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！]]

[[Hadoop大数据平台组件搭建系列 —— Hadoop完全分布式搭建（基于CentOS7.4）史上最简单的Hadoop完全分布式搭建 一站式解决！！！]]

[[Hadoop大数据平台组件搭建系列 1—— Zookeeper组件配置]]

[[Hadoop大数据平台组件搭建系列 2 —— Sqoop组件配置]]

[[Hadoop大数据平台组件搭建系列 3 —— Hive组件配置]]

[[Hadoop大数据平台组件搭建系列 4 —— Kafka组件配置]]

[[Hadoop大数据平台组件搭建系列 5 —— MySQL组件配置（tar源码安装）]]

[[Hadoop大数据平台组件搭建系列 6 —— Spark完全分布式组件配置]]

[[Hadoop大数据平台组件搭建系列 7 —— HBase完全分布式组件配置]]


