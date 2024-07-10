<script setup>
import tabBar from './components/tab-bar/tab-bar.vue';
import loading from './components/loading/loading.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
  
<template>
  <router-view></router-view>
  <tabBar v-if="!route.meta.hideTabBar"></tabBar>
  <loading />
</template>

<style scoped>

</style>
