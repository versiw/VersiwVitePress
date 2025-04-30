---
tags:
  - hadoop
  - spark
createDateTime: 2025-04-26 09:27:47
publish: true
---

# Hadoop大数据平台组件搭建系列 6 —— Spark完全分布式组件配置

## 简介

本篇介绍Hadoop大数据平台组件中的**Spark**组件的搭建

使用软件版本信息：

 [scala-2.11.12.tgz](https://pan.baidu.com/s/1Eze8nZYPyd6dN9DtyYqvEA)（百度云提取码：byqz）
 
[spark-2.4.4-bin-hadoop2.6.tgz](https://pan.baidu.com/s/1lX9zgXb6PLu7_LkC73mZlA)（百度云提取码：9xad）

## 安装
### 安装Scala

 - **解压scala安装包至目标目录，记得重命名，方便后续操作**

	```
	[root@master1 ~]# tar -zxvf /opt/software/scala-2.11.12.tgz -C /usr/local/scr/
	[root@master1 scr]# mv scala-2.11.12/ scala
	```


 - **修改环境变量**
 

	```powershell
	[root@master1 scr]# vi /etc/profile
	```
	
	> 添加以下内容
	
	```powershell
	#.....scala.....
	export SCALA_HOME=/usr/local/scr/scala
	export PATH=$PATH:$SCALA_HOME/bin
	```
	

	> 刷新环境变量
	

	```powershell
	[root@master1 scr]# source /etc/profile
	```
	

	> 检查安装scala版本
	
	```powershell
	[root@master1 scr]# scala -version
	```
	

	> 出现下图则安装scala成功
	
	![[Hadoop大数据平台组件搭建系列 6 —— Spark完全分布式组件配置-20250420.png]]

### 安装Spark完全分布式

 - **解压spark安装包，并重命名，便于后续操作**
 

	```powershell
	[root@master1 scr]# tar -zxvf /opt/software/spark-2.4.4-bin-hadoop2.6.tgz -C /usr/local/scr/
	[root@master1 scr]# mv spark-2.4.4-bin-hadoop2.6/ spark
	```
	

 - **修改环境变量**
 

	```powershell
	[root@master1 scr]# vi /etc/profile
	```
	
	> 添加以下内容
	
	```powershell
	#......spark.....
	export SPARK_HOME=/usr/local/scr/spark
	export PATH=$PATH:$SPARK_HOME/bin
	```

	> 刷新环境变量
	

	```powershell
	[root@master1 scr]# source /etc/profile
	```

 - **进入 conf 目录下，复制 spark-env.sh.template 改为 spark-env.sh，并修改内容**
 

	```powershell
	[root@master1 conf]# cp spark-env.sh.template spark-env.sh
	[root@master1 conf]# vi spark-env.sh
	```
	
	
	> 在最后添加以下内容：
	
	```powershell
	export JAVA_HOME=/usr/local/src/jdk
	export SCALA_HOME=/usr/local/scr/scala
	export HADOOP_HOME=/usr/local/scr/hadoop
	export HADOOP_CONF=/usr/local/scr/hadoop/etc/hadoop
	export SPARK_MASTER_IP=192.168.200.1
	export SPARK_MASTER_HOST=192.168.200.1
	export SPARK_LOCAL_IP=192.168.200.1
	export SPARK_WORKER_MEMORY=1g
	export SPARK_WORKER_CORES=2
	export SPARK_HOME=/usr/local/scr/spark
	export SPARK_DIST_CLASSPATH=$(/usr/local/scr/hadoop/bin/hadoop classpath)
	```

 

 - **修改slaves配置文件**

	> 复制 slaves.template 改为 slaves
		
	
	```powershell
	[root@master1 conf]# cp slaves.template slaves
	[root@master1 conf]# vi slaves
	```
	

	> 删除最后一行的localhost，添加以下内容
	
	```powershell
	master1
	master2
	slave1
	slave2
	```

 - **将 scala、spark、环境变量文件 拷贝分发给master2、slave1、slave2节点**
 
	```powershell
	#拷贝spark
	[root@master1 conf]# scp -r /usr/local/scr/spark/ master2:/usr/local/scr/
	#拷贝scala
	[root@master1 conf]# scp -r /usr/local/scr/scala/ master2:/usr/local/scr/
	#拷贝环境变量
	[root@master1 conf]# scp -r /etc/profile master2:/etc/profile
	....
	....
	```

 - **在每个拷贝分发的节点上，修改 spark-env.sh 中的 SPARK_LOCAL_IP，改为对应IP地址**

 - **在master1节点启动spark**
 
	```powershell
	[root@master1 conf]# /usr/local/scr/spark/sbin/start-all.sh 
	```

 -  **jps查看**

	> 每个节点出现worker进程，切master1节点上有master节点，如下图

 1. **master1节点**
![[Hadoop大数据平台组件搭建系列 6 —— Spark完全分布式组件配置-20250420-1.png]]
 2. **master2节点**
![[Hadoop大数据平台组件搭建系列 6 —— Spark完全分布式组件配置-20250420-2.png]]
 3. **slave1节点**
![[Hadoop大数据平台组件搭建系列 6 —— Spark完全分布式组件配置-20250420-3.png]]
 4. **slave2节点**

	![[Hadoop大数据平台组件搭建系列 6 —— Spark完全分布式组件配置-20250420-4.png]]



		

 - **web端查看spark**
 

	> master 端口号：==8080==

	![[Hadoop大数据平台组件搭建系列 6 —— Spark完全分布式组件配置-20250420-5.png]]

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


