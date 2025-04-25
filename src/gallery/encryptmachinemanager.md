---
pageClass: custom-gallery-class
layout: page
sidebar: false
aside: false
---

<script setup>
import { ref } from 'vue'
const data = ref({
    title: '链路加密机对称密钥管理系统',
    desc: 
    `
本系统是在Linux平台下开发的对称密钥管理系统，提供对称密钥的全生命周期管理功能。利用USBKEY生成的随机数作为 SM4 对称密钥，并采用SM2 算法加密下发至 IC卡中，确保加密机之间的密钥传输过程具备高度的安全性和可靠性。

技术栈：Linux、Shell、C/C++、Python、PySide6、SQLAlchemy、SQLite、PyQt-Fluent-Widgets等

● 负责系统的功能设计和编码实现，确保系统的高效运行。
● 设计并优化用户界面，构建符合现代审美的UI，提升系统的易用性和操作便捷性。
● 构建基于USBKey的随机数生成模块，确保SM4密钥的高安全生成。
● 实现SM2加密算法的高效封装，保障SM4密钥下发至IC卡过程的安全性。
● 利用Ctypes进行USBKey函数接口的重构，显著提升了接口调用响应速度，响应时间从2秒降低至0.5秒。
● 开发串口即时监听功能，实现读卡器与USBKey的自动识别和插拔响应，提升即插即用体验，设备识别速度提升60%。
● 编写Shell脚本，实现软件安装与环境配置自动化，提升系统部署效率。
    `,
    imgs: [
        '/gallery/encryptmachinemanager/KMS运行界面.png',
        '/gallery/encryptmachinemanager/KMS安装脚本运行.png',
        ]
} )
</script>

<Gallery :data="data" />
