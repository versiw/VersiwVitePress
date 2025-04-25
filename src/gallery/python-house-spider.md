---
pageClass: custom-gallery-class
layout: page
sidebar: false
aside: false
---

<script setup>
import { ref } from 'vue'
const data = ref({
    title: 'Python房产信息采集和可视化分析',
    desc: 
    `
项目旨在为购房数据提供简明的多维度房产信息分析，为购房者提供科学准确的数据支持。使用 Python 网络爬虫技术和 Scrapy 异步处理框架，采集并存储了特定区域的房产信息，通过 Pandas 数据分析库进行数据清洗和格式转换，最终利用 Flask和 ECharts 进行数据可视化展示。
    `,
    imgs: [
        '/gallery/python-house-spider/运行结果 (1).png',
        '/gallery/python-house-spider/运行结果 (5).png',
        '/gallery/python-house-spider/Flask Web前端可视化流程图.png',
        ]
} )
</script>

<Gallery :data="data" />
