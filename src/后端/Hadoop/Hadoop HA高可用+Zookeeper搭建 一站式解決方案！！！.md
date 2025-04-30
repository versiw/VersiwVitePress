---
tags:
  - hadoop
  - zookeeper
createDateTime: 2025-04-26 09:27:46
publish: true
---

# Hadoop HA高可用+Zookeeper搭建一站式解決方案！！！

## 简介

本篇介绍在 VMware+CentOS 7.4 环境上搭建 Hadoop HA+Zookeeper

Hadoop 集群分布如下：

| 编号  | 主机名     | namenode 节点 | zookeeper 节点 | journalnode 节点 | datanode 节点 | resourcemanager 节点 |
| --- | ------- | ----------- | ------------ | -------------- | ----------- | ------------------ |
| 1   | master1 | √           | √            | √              |             | √                  |
| 2   | master2 | √           | √            | √              |             | √                  |
| 3   | slave1  |             | √            | √              | √           |                    |
| 4   | slave2  |             |              |                | √           |                    |

使用软件版本：

jdk-8u144-linux-x64

[hadoop-2.6.0](https://archive.apache.org/dist/hadoop/common/hadoop-2.6.0/)

[zookeeper-3.4.14](http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.14/zookeeper-3.4.14.tar.gz)

## JDK 安装

### 解压 jdk 安装包至目标文件夹

```powershell
 tar -zxvf /opt/software/jdk-8u144-linux-x64.tar.gz -C /usr/local/src/
```

### 修改环境变量

```powershell
 vi /etc/profile
```

在最后添加如下内容：

```powershell
export JAVA_HOME=/usr/local/src/jdk 
export PATH=$JAVA_HOME/bin:$PATH
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=$JAVA_HOME/lib:$JRE_HOME/lib
```

### 使环境变量生效、检查 jdk 版本验证 jdk 安装是否成功

```powershell
 source /etc/profile
```

```powershell
 java -version
```

出现下图则 `jdk` 安装成功：

![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420.png]]

## Zookeeper 配置

### 解压 `zookeeper` 安装包至目标文件夹

```powershell
tar -zxvf /opt/software/zookeeper-3.4.14.tar.gz -C /usr/local/scr/
```

### 添加环境变量、环境变量生效

```powershell
vi /etc/profile
```

在最后添加如下内容：

```powershell
#.....zookeeper.....
export ZOOKEEPER_HOME=/usr/local/scr/zookeeper
export PATH=$PATH:$ZOOKEEPER_HOME/bin
```

使环境变量生效：

```powershell
source /etc/profile
```


### 在 `zookeeper` 目录下创建 `data` 目录并在其中新建 `myid` 文件

```powershell
[root@master1 zookeeper]# mkdir data
[root@master1 data]# touch myid 
[root@master1 data]# echo 1 >> myid 
```

### 配置 `zookeeper` 目录下的 `conf` 文件夹中的 `zoo.cfg` 文件

复制 `zoo_sample.cfg` 文件并改名为 `zoo.cfg`

```powershell
 [root@master1 conf]# cp zoo_sample.cfg zoo.cfg 
```

修改 `zoo.cfg` 文件中 `dataDir` 数据存放位置，指向为第三步中的 `data` 目录，并在最后添加 `zookeeper` 集群节点分布

```powershell
[root@master1 conf]# vi zoo.cfg 
```

![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-1.png]]

### 拷贝分发 `zookeeper` 给 `master2`、`slave1` 节点

拷贝 zookeeper 软件

```powershell
[root@master1 ~]# scp -r /usr/local/scr/zookeeper/ master2:/usr/local/scr/
```

拷贝环境变量文件

```powershell
[root@master1 ~]# scp -r /etc/profile master2:/etc/profile
```

使环境变量生效

```powershell
source /etc/profile
```

> [!note] 注意
> `master2`、`slave1` 节点中 `zookeeper` 目录下 `data` 目录下的 `myid` 文件中需分别修改为 2 和 3


### 三个 zookeeper 节点分别启动 Zookeeper 集群，并验证安装是否成功

```powershell
[root@master1 ~]# zkServer.sh start
[root@master1 ~]# zkServer.sh status
```

`zookeeper` 成功搭建则显示为如下：

![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-2.png]]

![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-3.png]]

![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-4.png]]
## Hadoop HA 配置

### 解压 Hadoop 安装包到目标目录下，并配置环境变量

```powershell
 tar -zxvf /opt/software/hadoop-2.6.0.tar.gz -C /usr/local/scr/
```

修改环境变量：

```powershell
[root@master1 ~]# vi /etc/profile
```

添加环境变量：

```powershell
#.....hadoop......
export HADOOP_HOME=/usr/local/scr/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

刷新环境变量：

```powershell
[root@master1 ~]# source /etc/profile
```

### 配置 `hadoop-env.sh` 文件：（配置文件都在`.../hadoop/etc/hadoop/...` 路径下）

修改文件中 `jdk` 路径

![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-5.png]]
 
### 配置 `core-site.xml` 文件：

```powershell
 <configuration>
        <property>
                <name>fs.defaultFS</name>
                <value>hdfs://myha</value>
        </property>
        <property>
                <name>hadoop.tmp.dir</name>
                <value>/usr/local/scr/hadoop/tmp</value>
        </property>
        <property>
                <name>ha.zookeeper.quorum</name>
                <value>master1:2181,master2:2181,slave1:2181</value>
        </property>
        <property>
                <name>ha.zookeeper.session-timeout.ms</name>
                <value>1000</value>
        </property>
</configuration>
```

### 配置 `hdfs-site.xml` 文件：

```powershell
<configuration>
        <property>
                <name>dfs.replication</name>
                <value>2</value>
        </property>
        <property>
                <name>dfs.namenode.name.dir</name>
                <value>/usr/local/scr/hadoop/tmp/dfs/name</value>
        </property>
        <property>
                <name>dfs.datanode.data.dir</name>
                <value>/usr/local/scr/hadoop/tmp/dfs/data</value>
        </property>
        <property>
                <name>dfs.webhdfs.enabled</name>
                <value>true</value>
        </property>
        <property>
                <name>dfs.nameservices</name>
                <value>myha</value>
        </property>
        <property>
                <name>dfs.ha.namenodes.myha</name>
                <value>nn1,nn2</value>
        </property>
        <property>
                <name>dfs.namenode.rpc-address.myha.nn1</name>
                <value>master1:9000</value>
        </property>
        <property>
                <name>dfs.namenode.http-address.myha.nn1</name>
                <value>master1:50070</value>
        </property>
        <property>
                <name>dfs.namenode.rpc-address.myha.nn2</name>
                <value>master2:9000</value>
        </property>
        <property>
                <name>dfs.namenode.http-address.myha.nn2</name>
                <value>master2:50070</value>
        </property>
        <property>
                <name>dfs.namenode.shared.edits.dir</name>
                <value>qjournal://master1:8485;master2:8485;slave1:8485/myha</value>
        </property>
        <property>
                <name>dfs.journalnode.edits.dir</name>
                <value>/usr/local/scr/hadoop/data/journaldata</value>
        </property>
        <property>
                <name>dfs.ha.automatic-failover.enabled</name>
                <value>true</value>
        </property>
        <property>
                <name>dfs.client.failover.proxy.provider.myha</name>
                <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
        </property>
        <property>
                <name>dfs.ha.fencing.methods</name>
                <value>
                        sshfence
                        shell(/bin/true)
                </value>
        </property>
        <property>
                <name>dfs.ha.fencing.ssh.private-key-files</name>
                <value>/root/.ssh/id_rsa</value>
        </property>
        <property>
                <name>dfs.ha.fencing.ssh.connect-timeout</name>
                <value>30000</value>
        </property>
        <property>
                <name>ha.failover-controller.cli-check.rpc-timeout.ms</name>
                <value>60000</value>
        </property>
</configuration>
```

### 配置 `mapred-site.xml` 文件：

```powershell
cp mapred-site.xml.template mapred-site.xml
```

```powershell
<configuration>
        <property>
                <name>mapreduce.framework.name</name>
                <value>yarn</value>
        </property>
        <property>
                <name>mapreduce.jobhistory.address</name>
                <value>master1:10020</value>
        </property>
        <property>
                <name>mapreduce.jobhistory.webapp.address</name>
                <value>master1:19888</value>
        </property>
</Configuration>

```

### 配置 `yarn-site.xml` 文件：
 
```powershell
<configuration>

<!-- Site specific YARN configuration properties -->
        <property>
                <name>yarn.resourcemanager.ha.enabled</name>
                <value>true</value>
        </property>
        <property>
                <name>yarn.resourcemanager.cluster-id</name>
                <value>yrc</value>
        </property>
        <property>
                <name>yarn.resourcemanager.ha.rm-ids</name>
                <value>rm1,rm2</value>
        </property>
        <property>
                <name>yarn.resourcemanager.hostname.rm1</name>
                <value>master1</value>
        </property>
        <property>
                <name>yarn.resourcemanager.hostname.rm2</name>
                <value>master2</value>
        </property>
        <property>
                <name>yarn.resourcemanager.zk-address</name>
                <value>master1:2181,master2:2181,slave1:2181</value>
        </property>
        <property>
                <name>yarn.nodemanager.aux-services</name>
                <value>mapreduce_shuffle</value>
        </property>
        <property>
                <name>yarn.log-aggregation-enabled</name>
                <value>true</value>
        </property>
        <property>
                <name>yarn.log-aggregation.retain-seconds</name>
                <value>86400</value>
        </property>
        <property>
                <name>yarn.resourcemanager.recovery.enabled</name>
                <value>true</value>
        </property>
        <property>
                <name>yarn.resourcemanager.store.class</name>
                <value>org.apache.hadoop.yarn.server.resourcemanager.recovery.ZKRMStateStore</value>
        </property>
</configuration>
```

### 修改 slaves 文件：
 

```powershell
slave1
slave2
```

### 进入 `hadoop` 目录下创建 `tmp` 临时目录以及 `journaldata` 目录
 

```powershell
[root@master1 hadoop]# mkdir -p tmp/dfs/name
[root@master1 hadoop]# mkdir -p tmp/dfs/data
[root@master1 hadoop]# mkdir -p data/journaldata
```

### 拷贝分发至子节点 `master2`、`slave1`、`slave`

拷贝 hadoop 软件

```powershell
scp -r /usr/local/scr/hadoop/ master2:/usr/local/scr/
```

拷贝环境变量文件

```powershell
scp -r /etc/profile master2:/etc/profile
```

使环境变量生效

```powershell
source /etc/profile
```

## Hadoop 初始化、启动 (按顺序！按顺序！按顺序！)

 **1. 启动 Zookeeper**

```powershell
zkServer.sh start
```

 **2. 在你配置的各个 journalnode 节点启动该进程**
 

```powershell
hadoop-daemon.sh start journalnode
```

 **3. 格式化 namenode（先选取一个 namenode（master1）节点进行格式化）**
 

```powershell
hadoop namenode -format
```

 **4. 要把在 master1 节点上生成的元数据复制到另一个 namenode（master2）节点上**
 

```powershell
scp -r /usr/local/scr/hadoop/tmp master2:$PWD
```

 **5. 格式化 zkfc**(如果出现**两个节点都为 standby**，请注意有没有格式化 zkfc 哦！！！)
 

```powershell
hdfs zkfc -formatZK
```

 **6. 启动 HDFS**
 

```powershell
start-dfs.sh
```

 **7. 启动 YARN**
 

```powershell
start-yarn.sh
#若resourcemanager备用节点（master2）没有成功启动起来，则手动启动
yarn-daemon.sh start resourcemanager
```

 **8. 启动 mapreduce 任务历史服务器**

```powershell
mr-jobhistory-daemon.sh start historyserver
```

 **9. 查看各主节点的状态**

```powershell
#HDFS
hdfs haadmin -getServiceState nn1
hdfs haadmin -getServiceState nn2
#YARN
yarn rmadmin -getServiceState rm1
yarn rmadmin -getServiceState rm2
```

 **10. web 验证**

 - Web 方式验证 hdfs（ip 地址:50070）
 ![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-6.png]]
 
 ![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-7.png]]
 - Web 方式验证 Yarn（ip 地址:8088）

![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-8.png]]

![[Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！-20250420-9.png]]

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


