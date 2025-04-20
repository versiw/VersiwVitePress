
## 什么是 SSH？

> 传统的网络服务程序，如 FTP、Pop 和 Telnet 在传输机制和实现原理上是没有考虑安全机制的，其本质上都是不安全的；因为它们在网络上用明文传送数据、用户帐号和用户口令，别有用心的人通过窃听等网络攻击手段非常容易地就可以截获这些数据、用户帐号和用户口令。而且，这些网络服务程序的简单安全验证方式也有其弱点，那就是很容易受到"中间人"（man-in-the-middle）这种攻击方式的攻击。所谓"中间人"的攻击方式，就是"中间人"冒充真正的服务器接收你的传给服务器的数据，然后再冒充你把数据传给真正的服务器。服务器和你之间的数据传送被"中间人"一转手做了手脚之后，就会出现很严重的问题。
> SSH 是英文 Secure Shell 的简写形式。通过使用 SSH，你可以把所有传输的数据进行加密，这样"中间人"这种攻击方式就不可能实现了，而且也能够防止 DNS 欺骗和 IP 欺骗。使用 SSH，还有一个额外的好处就是传输的数据是经过压缩的，所以可以加快传输的速度。

## SSH 登录时有两种验证方法

 - 第一种：
基于密码的安全验证，它要求用户在每次登录服务器时输入密码，服务器端验证通过后即登录成功。
 - 第二种：
基于密钥的安全验证，客户端的公钥会预先保存在服务器端，当登录时，服务器端会使用该公钥做验证，如果验证成功，用户不需输入密码即完成登录。为了避免每次都输入密码这种重复性工作，我们选择第二种方式进行远程登录

## SSH 的原理
![[Linux中实现Hadoop各节点间的SSH免密登录-20250420.png]]
## Linux 中实现 Hadoop 各节点间的 SSH 免密登录

实验节点为 4 个：

| master1 | master2  | slave1 | slave2 |
|--|--|--|--|
| 主节点 1 | 主节点 2 | 从节点 1 | 从节点 2 |

### 1. 各节点生成公钥秘钥对

四个节点都要做一遍，中间一路回车，生成的公钥秘钥会在 /root/. ssh/ 路径下

```powershell
[root@master1 ~]# ssh-keygen -t rsa
```

![[Linux中实现Hadoop各节点间的SSH免密登录-20250420-1.png]]

### 2. 进入 master1 节点的 /root/. ssh/ 目录下

将 master1 公钥拷贝一份，命名为 authorized_keys

```powershell
[root@master1 ~]# cd .ssh/
[root@master1 .ssh]# cp id_rsa.pub authorized_keys
[root@master1 .ssh]# cat authorized_keys 
```

此时，公钥已经保存在 authorized_keys 文件中了

![[Linux中实现Hadoop各节点间的SSH免密登录-20250420-2.png]]

### 3. 将 authorized_keys 复制到 master2 上

用 scp 命令复制 authorized_keys 到 master2 的 /root/. ssh/目录下，中间需要确认输入密码

```powershell
[root@master1 .ssh]# scp authorized_keys master2:/root/.ssh/
```

![[Linux中实现Hadoop各节点间的SSH免密登录-20250420-3.png]]

### 4. 切换至 master2 节点，将 master2 公钥保存在 authorized_keys 中

进入 master2 的 /root/. ssh/ 目录下，因为 authorized_keys 已经复制到 msater2 的/root/. ssh/目录下，所以，用 cat 追加内容至 authorized_keys 文件即可

```powershell
[root@master2 ~]# cd .ssh/
[root@master2 .ssh]# cat id_rsa.pub >> authorized_keys 
```

master2 的公钥就保存在 authorized_keys 文件中了

![[Linux中实现Hadoop各节点间的SSH免密登录-20250420-4.png]]

### 5. 重复第 4 步，将 slave1、slave2 节点的公钥保存至 authorized_keys 中

### 6. 将 slave2 中的公钥保存至 authorized_keys 中后
将 slave2 中 authorized_keys 拷贝复制到 master1、master2、slave1 节点的/root/. ssh/目录下

```powershell
[root@slave2 .ssh]# scp authorized_keys master1:/root/.ssh/
[root@slave2 .ssh]# scp authorized_keys master2:/root/.ssh/
[root@slave2 .ssh]# scp authorized_keys slave1:/root/.ssh/
```

### 7. 至此，SSH 免密登录完成

```powershell
[root@master1 ~]# ssh master2
```

![[Linux中实现Hadoop各节点间的SSH免密登录-20250420-5.png]]
 

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


