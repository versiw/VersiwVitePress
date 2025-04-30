---
tags:
  - hadoop
  - hbase
createDateTime: 2025-04-26 09:27:48
publish: true
---

# Hadoop大数据平台组件搭建系列 7 —— HBase完全分布式组件配置

## 简介

本篇介绍Hadoop大数据平台组件中的HBase组件的搭建(搭建HBase前需搭建完成Hadoop以及zookeeper)

使用软件版本信息：

[hbase-1.2.12-bin.tar.gz](https://pan.baidu.com/s/1_jN_eFNoNBoOmFZwfIBy7w)（百度云提取码：zf9f）
## 安装
### 解压Hbase并重命名

```powershell
tar -zxvf /opt/software/hbase-1.2.12-bin.tar.gz -C /usr/local/scr/
```

### 添加Hbase环境变量并刷新环境变量

添加环境变量

```powershell
#....hbase.....
export HBASE_HOME=/usr/local/scr/hbase
export PATH=$PATH:$HBASE_HOME/bin
```

刷新环境变量

```powershell
source /etc/profile
```

### 修改配置文件`hbase-env.sh`

```powershell
# 指定jdk路径
 export JAVA_HOME=/usr/local/src/jdk
# 加入hadoop配置文件的目录
 export HBASE_CLASSPATH=/usr/local/scr/hadoop/etc/hadoop
# 默认值是 true，hbase 在启动时自动开启 zookeeper，如需自己维护 zookeeper 集群需设置为 false
 export HBASE_MANAGES_ZK=false
```

### 修改配置文件`hbase-site.xml`

```powershell
<configuration>
	<property>
		<!-- 指定 region server 的共享目录，用来持久化 HBase。这里指定的 HDFS 地址
	是要跟 core-site.xml 里面的 fs.defaultFS 的 HDFS 的 IP 地址或者域名、端口必须一致。 -->
		<name>hbase.rootdir</name>
		<value>hdfs://myha/hbase</value>
	</property>
        <property>
        		<!-- 启用 hbase 分布式模式 -->
                <name>hbase.cluster.distributed</name>
                <value>true</value>
        </property>
        <property>
        		<!-- Zookeeper 集群的地址列表，用逗号分割 -->
                <name>hbase.zookeeper.quorum</name>
                <value>master1,master2,slave1</value>
        </property>
        <property>
        		<!-- 指定数据拷贝 3 份，hdfs 默认是 3 份。我只设置了2份 -->
                <name>dfs.replication</name>
                <value>2</value>
        </property>
        <property>
        		<!-- 指定 hbase 的 master -->
                <name>hbase.master</name>
                <value>master1</value>
        </property>
        <property>
        		<!--zookooper配置、日志等的存储位置 -->
                <name>hbase.zookeeper.property.dataDir</name>
                <value>/usr/local/scr/hbase/tmp</value>
        </property>
</configuration>
```

### 修改配置文件`regionservers`

```powershell
# 将配置好的Hadoop集群中的slaves节点名添加在该文件中
slave1
slave2
```

### 拷贝分发

```powershell
scp -r /usr/local/scr/hbase/ slave1:/usr/local/scr/
scp -r /usr/local/scr/hbase/ slave2:/usr/local/scr/
```

### 启动Hbase

启动Hbase之前需先启动hadoop

```powershell
start-hbase.sh
```

### 检验安装是否成功
查看web端	master IP地址：16010

![[Hadoop大数据平台组件搭建系列 7 —— HBase完全分布式组件配置-20250420.png]]

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


