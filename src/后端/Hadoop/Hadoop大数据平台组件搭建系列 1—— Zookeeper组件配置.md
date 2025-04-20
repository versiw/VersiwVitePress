

## 简介

本篇介绍Hadoop大数据平台组件中的**Zookeeper**组件的搭建

使用软件版本信息

[zookeeper-3.4.14.tar.gz](http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.14/zookeeper-3.4.14.tar.gz)

## Zookeeper安装

### 解压Zookeeper安装包至目标目录下，并配置环境变量，使环境变量生效

解压zookeeper安装包

```powershell
tar -zxvf /opt/software/zookeeper-3.4.14.tar.gz -C /usr/local/scr/
```

修改环境变量

```powershell
#.....zookeeper.....
export ZOOKEEPER_HOME=/usr/local/scr/zookeeper
export PATH=$PATH:$ZOOKEEPER_HOME/bin
```

使环境变量生效

```powershell
source /etc/profile
```

### 配置dataDir映射目录下的myid文件
 

在zookeeper目录下创建data文件夹，在data目录下创建 **myid** 文件

```powershell
[root@master1 zookeeper]# mkdir data
[root@master1 zookeeper]# cd data
[root@master1 data]# touch myid 
[root@master1 data]# echo 1 >> myid 
```

### 配置 ${ZOOKEEPER_HOME}/conf 路径 下的zoo.cfg文件

复制 zoo_sample.cfg 文件 改名为 zoo.cfg

```powershell
cp zoo_sample.cfg zoo.cfg 
```

修改 zoo.cfg 文件

```powershell
vi zoo.cfg 
```

### 将 zoo.cfg 文件中的dataDir路径指向之前的data路径，并在最后添加zookeeper集群配置

注意：zookeeper 集群配置中，每个节点的 myid 文件中的数字需跟节点对应！！！

![[Hadoop大数据平台组件搭建系列1 —— Zookeeper组件配置-20250420.png]]

### 启动Zookeeper集群，并验证

zookeeper集群节点分别启动

```powershell
zkServer.sh start
```

查看zookeeper集群节点的状态

```powershell
zkServer.sh status
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


