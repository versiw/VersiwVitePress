
## 简介

本篇介绍Hadoop大数据平台组件中Kafka组件的搭建（**需提前配置好Zookeeper集群**）

使用软件版本信息：

 [kafka_2.11-1.0.0.tgz](https://pan.baidu.com/s/1I058-IcUKcy1u_DdXQuB7w)（百度云提取码：1usv）

## Kafka安装与配置

### 解压并配置环境变量

解压kafka压缩包

```powershell
 tar -zxvf /opt/software/kafka_2.11-1.0.0.tgz -C /usr/local/scr/
```

修改环境变量

```powershell
 vi /etc/profile
```

添加环境变量

```powershell
 #.....kafka.....
export KAFKA_HOME=/usr/local/scr/kafka
export PATH=$PATH:$KAFKA_HOME/bin
```

使环境变量生效

```powershell
source /etc/profile
```

### 进入`{KAFKA_HOME}/config`目录下修改配置文件 `server.properties`

在`server.properties` 配置文件中注释下面内容

```powershell
#broker.id=0
#zookeeper.connect=localhost:2181
```

在文件最后添加以下内容，`broker.id` 每个节点需不同，`listeners`中IP地址与节点IP地址相对应

```powershell
broker.id=1
zookeeper.connect=192.168.200.1:2181,192.168.200.2:2181,192.168.200.3:2181
listeners=PLAINTEXT://192.168.200.1:9092
```

### 拷贝分发

拷贝分发时记得修改其他节点的 server.properties 配置内容与之对应

```powershell
scp -r /usr/local/scr/kafka/ master2:/usr/local/scr/
```

### 验证安装是否成功

启动Zookeeper，集群都要启动

```powershell
zkServer.sh start
```

启动Kafka，集群都要启动

```powershell
kafka-server-start.sh -daemon /usr/local/scr/kafka/config/server.properties 
```

使用 jps 命令查看kafka进程是否启动成功

![[Hadoop大数据平台组件搭建系列 4 —— Kafka组件配置-20250420.png]]

创建topic

```powershell
kafka-topics.sh --create --zookeeper 192.168.200.1:2181 --replication-factor 1 --partitions 1 --topic test
```

![[Hadoop大数据平台组件搭建系列 4 —— Kafka组件配置-20250420-1.png]]

查看topic，再其他节点上也可以查看其他节点上创建的topic信息

```powershell
kafka-topics.sh --list --zookeeper 192.168.200.1:2181
```

![[Hadoop大数据平台组件搭建系列 4 —— Kafka组件配置-20250420-2.png]]

创建发布	(退出 Ctrl+C)

```powershell
kafka-console-producer.sh --broker-list 192.168.200.1:9092 --topic test
```

![[Hadoop大数据平台组件搭建系列 4 —— Kafka组件配置-20250420-3.png]]

创建消费

```powershell
kafka-console-consumer.sh --bootstrap-server 192.168.200.1:9092 --topic test --from-beginning
```

![[Hadoop大数据平台组件搭建系列 4 —— Kafka组件配置-20250420-4.png]]

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


