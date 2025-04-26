---
pageClass: custom-book-class
outline: [2, 3, 4]
sidebar: false
---

<script setup>
import { data } from './book.data.ts'
</script>

# 书架

<Library :data="data" />
