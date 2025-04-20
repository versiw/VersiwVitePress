## 简介

本篇介绍 Hadoop 大数据平台组件中的**MySQL**组件的搭建

软件版本信息：

 [mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz](https://pan.baidu.com/s/1sya36n2_FJwDgxvB3j-BAQ)（百度云提取码：omqc）

## 安装

### 解压安装包至目标目录下

```powershell
[root@localhost ~]# tar -zxvf /opt/software/mysql-5.7.28-linux-glibc2.12-x86_64.tar.gz -C /usr/local/src/
```

重命名，便于操作

```powershell
[root@localhost src]# mv mysql-5.7.28-linux-glibc2.12-x86_64/ mysql
```

### 修改环境变量，添加 MySQL 环境变量，使环境变量生效
 
```powershell
[root@localhost ~]# vi /etc/profile
```
 
添加 MySQL 环境变量

```powershell
#.....mysql.....
export MYSQL_HOME=/usr/local/src/mysql
export PATH=$PATH:$MYSQL_HOME/bin
```

使环境变量生效

```powershell
[root@localhost src]# source /etc/profile
```

### 配置 `my.cnf` 文件

```powershell
[root@localhost mysql]# vi /etc/my.cnf
```

修改内容

记得在 `mysql` 目录下创建 `data` 目录以及 `log` 目录下 `mariadb` 目录及文件

```powershell
[root@localhost mysql]# mkdir data
[root@localhost log]# mkdir /var/log/mariadb
[root@localhost log]# touch /var/log/mariadb/mariadb.log
```

```powershell
[mysqld]
datadir=/usr/local/src/mysql/data
basedir=/usr/local/src/mysql
max_connections=200
port=3306
user=root
character-set-server=utf8
lower_case_table_names=1
socket=/usr/local/src/mysql/mysql.sock

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
# instructions in http://fedoraproject.org/wiki/Systemd

[mysqld_safe]
log-error=/var/log/mariadb/mariadb.log
pid-file=/var/run/mariadb/mariadb.pid

#
# include all files from the config directory
#
!includedir /etc/my.cnf.d

[client]
socket=/usr/local/src/mysql/mysql.sock
default-character-set=utf8
```

### 进入 mysql 目录下，进行 mysql 初始化

```powershell
[root@localhost mysql]# ./bin/mysqld --user=mysql --basedir=/usr/local/src/mysql --datadir=/usr/local/src/mysql/data --initialize
```

如果报错，出现下图所示内容

![[Hadoop大数据平台组件搭建系列 5 —— MySQL组件配置（tar源码安装）-20250420.png]]

解决方法：

```powershell
[root@localhost mysql]# yum install -y libaio
```

记下初始化的密码

![[Hadoop大数据平台组件搭建系列 5 —— MySQL组件配置（tar源码安装）-20250420-1.png]]

### 开启 mysql 服务

```powershell
[root@localhost mysql]# ./support-files/mysql.server start
```

### 添加开机启动
 
```powershell
[root@localhost mysql]# cp /usr/local/src/mysql/support-files/mysql.server  /etc/init.d/mysqld
```

修改文件 `/etc/init.d/mysqld` 

```powershell
[root@localhost mysql]# vi /etc/init.d/mysqld 
```

添加内容

```powershell
basedir=/usr/local/src/mysql
datadir=/usr/local/src/mysql/data
```

加入开机启动


```powershell
[root@localhost mysql]# chkconfig --add mysqld  
```

### 启动 MySQL
 

```powershell
[root@localhost mysql]# service mysqld start
```

### 登录 MySQL

第一次登录输入之前给的初始化密码

```powershell
[root@localhost mysql]# mysql -u root -p
```

### 修改登录密码
 
```powershell
mysql> alter user 'root'@'localhost' identified by 'passwd（你要修改后的密码）';
```

### 设置允许远程连接数据库

```powershell
mysql> use mysql
mysql> update user set user.Host='%' where user.User='root';

```

### 刷新权限

```powershell
mysql> flush privileges;
mysql> select user.host from user;
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


