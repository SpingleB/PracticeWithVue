<script setup lang="ts">

import { ref } from 'vue';
import Header from './components/Header.vue';
import Search from './components/Search.vue';
import Main from './components/main/Main.vue';
</script>

<template>
<Header/>
<h1 class="bricolage-grotesque-preset-2-blod title">How’s the sky looking today?</h1>
<Search/>
<Main/>
</template>

<style scoped>
  .title {
    color: var(--color-netural-0);
    text-align: center;
    margin: 50px 0;
  }
</style>
