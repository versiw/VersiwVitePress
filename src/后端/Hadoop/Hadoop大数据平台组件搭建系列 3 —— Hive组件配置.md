---
tags:
  - hadoop
  - hive
createDateTime: 2025-04-26 09:27:47
publish: true
---

# Hadoop大数据平台组件搭建系列 3 —— Hive组件配置

## 简介

本篇介绍Hadoop大数据平台组件中的Hive组件的搭建(**搭建Hive前需搭建完成MySQL**)

使用软件版本
[apache-hive-1.1.0-bin.tar](http://archive.apache.org/dist/hive/hive-1.1.0/)

[mysql-connector-java-5.1.47.jar](https://pan.baidu.com/s/1CHBRZG401-ViWMxpcEI-bw)（百度云提取码：vk6v）

## 安装Hive

### 解压hive安装包，设置hive的环境变量

解压软件

```powershell
tar -zxvf /opt/software/apache-hive-1.1.0-bin.tar.gz -C /usr/local/scr/
```

软件重命名（便于操作）

```powershell
mv apache-hive-1.1.0-bin/ hive
```

设置hive环境变量

```powershell
vi /etc/profile
```

添加环境变量

```powershell
#.....hive.....
export HIVE_HOME=/usr/local/scr/hive
export PATH=$PATH:$HIVE_HOME/bin
```

使环境变量生效

```powershell
source /etc/profile
```

### 拷贝驱动文件到 `{HIVE_HOME}/lib` 路径下
 
```powershell
cp /opt/software/mysql-connector-java-5.1.47.jar /usr/local/scr/hive/lib/
```

### 创建HDFS文件夹（如有需要可以更改路径，在`hive-site.xml`中修改）

因为在hive-site.xml中有如下HDFS相关设置，因此我们需要先在HDFS中创建对应目录并赋予权限

```powershell
  <property>
    <name>hive.metastore.warehouse.dir</name>
    <value>/user/hive/warehouse</value>
  </property>
  <property>
    <name>hive.exec.scratchdir</name>
    <value>/tmp/hive</value>
  </property>
```

```powershell
[root@master1 ~]# hadoop fs -mkdir -p /user/hive/warehouse
[root@master1 ~]# hadoop fs -mkdir -p /tmp/hive
[root@master1 ~]# hadoop fs -chmod -R 777 /user/hive/warehouse
[root@master1 ~]# hadoop fs -chmod -R 777 /tmp/hive
```

### 修改配置文件
 
复制 `hive-default.xml.template` 改名为 `hive-site.xml`文件并修改

```powershell
 cp hive-default.xml.template hive-site.xml
```

修改相关配置

#### 1. 将 `hive-site.xml`中的{system:java.io.tmpdir}改为hive的本地临时目录，将{system:user.name}改为用户名。(共有4处需要修改)

没有hive的本地临时目录，先到hive目录下创建本地临时目录 tmp

```powershell
  <property>
    <name>hive.exec.local.scratchdir</name>
    <value>/usr/local/scr/hive/tmp/root</value>
  </property>
  
  <property>
    <name>hive.downloaded.resources.dir</name>
    <value>/usr/local/scr/hive/tmp/${hive.session.id}_resources</value>
  </property>

  <property>
    <name>hive.server2.logging.operation.log.location</name>
    <value>/usr/local/scr/hive/tmp/root/operation_logs</value>
  </property>

  <property>
    <name>hive.querylog.location</name>
    <value>/usr/local/scr/hive/tmp/root</value>
  </property>
```
 
#### 2. 数据库相关配置
 
```powershell
# 数据库jdbc地址
  <property>
    <name>javax.jdo.option.ConnectionURL</name>
    <value>jdbc:mysql://master2:3306/hive?createDatabaseIfNotExist=true&amp;characterEncoding=UTF-8&amp;useSSL=false</value>
  </property>
  
# 数据库的驱动类名称
# 新版本8.0版本的驱动为com.mysql.cj.jdbc.Driver
# 旧版本5.x版本的驱动为com.mysql.jdbc.Driver
  <property>
    <name>javax.jdo.option.ConnectionDriverName</name>
    <value>com.mysql.cj.jdbc.Driver</value>
  </property>
  
# 数据库用户名
  <property>
    <name>javax.jdo.option.ConnectionUserName</name>
    <value>root</value>
  </property>
 
# 数据库密码
   <property>
    <name>javax.jdo.option.ConnectionPassword</name>
    <value>passwd</value> 
  </property>

```

#### 3. 配置`hive-log4j2.properties`
 

复制并更名hive-log4j2.properties.template为 hive-log4j2.properties文件

```powershell
 cp hive-log4j.properties.template hive-log4j.properties
```

修改配置

```powershell
hive.log.dir=/usr/local/scr/hive/tmp/root
```

#### 4. 配置`hive-env.sh`文件
 

复制并更名`hive-env.sh.template`为 `hive-env.sh`文件

```powershell
[root@master1 conf]# cp hive-env.sh.template hive-env.sh
[root@master1 conf]# vi hive-env.sh
```

修改配置

```powershell
# Set HADOOP_HOME to point to a specific hadoop install directory
export HADOOP_HOME=/usr/local/scr/hadoop

# Hive Configuration Directory can be controlled by:
export HIVE_CONF_DIR=/usr/local/scr/hive/conf

# Folder containing extra ibraries required for hive compilation/execution can be controlled by:
export HIVE_AUX_JARS_PATH=/usr/local/scr/hive/lib
```

### 启动hive

进入mysql，创建Hive数据库

![[Hadoop大数据平台组件搭建系列 3 —— Hive组件配置-20250420.png]]

注意：将{HADOOP_HOME}/share/hadoop/yarn/lib目录下的jline-0.9.94.jar替换成hive/lib下的jline-2.12.jar

```powershell
cp /usr/local/scr/hive/lib/jline-2.12.jar /usr/local/scr/hadoop/share/hadoop/yarn/lib/
mv jline-0.9.94.jar /media/
```

进入hive的bin目录，进行初始化操作

```powershell
schematool -dbType mysql -initSchema
```

启动hive

```powershell
[root@master1 ~]# hive
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


