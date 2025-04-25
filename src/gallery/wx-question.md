---
pageClass: custom-gallery-class
layout: page
sidebar: false
aside: false
---

<script setup>
import {  ref } from 'vue'
const data= ref({
    title: '微信小程序题库管理系统',
    desc: 
    `
    该题库系统主要为学生提供灵活做题的需求，促进学生对知识点的系统复习及全面掌握，同时提供数据分析模块方便学生掌握自己的答题数据。使用 Django Web  框架搭建服务器后端，为微信小程序提供 API  数据接口，并利用 MySQL  数据库进行存储，前端通过 Vant Weapp  进行界面设计。在系统实现方面，实现了登陆管理、用户管理、试卷管理、题库管理和个人中心等主要功能。
    `,
    imgs: [
        '/gallery/wx-question/1.png',
        '/gallery/wx-question/2.png',
        '/gallery/wx-question/3.png',
        ]
} )
</script>

<Gallery :data="data" />
