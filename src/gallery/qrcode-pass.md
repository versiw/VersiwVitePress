---
pageClass: custom-gallery-class
layout: page
sidebar: false
aside: false
---

<script setup>
import { ref } from 'vue'
const data = ref({
    title: '二维码加密数字通行证系统',
    desc: 
    `
本系统融合了二维码与国密算法技术，有效解决了传统纸质通行证的多种弊端，如易丢失、易伪造、管理成本高昂以及信息流转不便等问题。同时，它极大地增强了对人员隐私和身份信息的安全保护。

技术栈：Electron、React、Vite、TypeScript、Ant Design等

● 负责系统的功能设计和编码实现，完成安装包的制作，成功交付软件项目。
● 采用国密算法对通行证信息进行高强度加密，保障通行证信息在生成、传输和存储过程中的安全性。
● 完成贴纸打印模块的开发，通过优化USBKEY的缓存机制及分批调用策略，将贴纸生成数量提升至300张，显著提升打印效率和系统性能。
● 构建基于Express的API接口，以支持与扫码设备的交互通信。
● 运用Taro框架开发微信小程序端，实现了跨平台的功能一致性。
    `,
    imgs: [
        '/gallery/qrcode-pass/1.png',
        '/gallery/qrcode-pass/2.jpg',
        ]
} )
</script>

<Gallery :data="data" />
