---
pageClass: custom-gallery-class
layout: page
sidebar: false
aside: false
---

<script setup>
import { ref } from 'vue'
const data = ref({
    title: 'Django招聘网站爬虫管理和数据分析系统',
    desc: 
    `
当前招聘网站数量多且存在较为复杂的加密算法，为了实现多数据源的采集以及爬虫运行的持久化管理。分析发现，招聘网站内存分布以及结构存在相似性，通过 Django 搭建 Web 端实现爬虫的管理，服务器端爬虫脚本利用 Selenium 模拟人工操作，绕过网站的加密算法，实现高效爬取。使用 ECharts 图表进行数据可视化，分析职位需求的特点。针对存储的招聘信息进行统计分析，帮助用户探索特定职位的职责和需求，提供更多维的参考角度。
    `,
    imgs: [
        '/gallery/django-job-spider/系统总体架构图（手绘）.png',
        '/gallery/django-job-spider/招聘网站爬虫管理和数据分析系统-爬虫管理模块1.png',
        '/gallery/django-job-spider/招聘网站爬虫管理和数据分析系统-爬虫管理模块2.png',
        '/gallery/django-job-spider/招聘网站爬虫管理和数据分析系统-数据分析模块.png',
        ]
} )
</script>

<Gallery :data="data" />
