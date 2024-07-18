<script setup>
import tabBar from './components/tab-bar/tab-bar.vue';
import loading from './components/loading/loading.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <!-- name属性 -->
  <router-view v-slot="props">
    <keep-alive include="home">
      <component :is="props.Component"></component>
    </keep-alive>
  </router-view>
  <tabBar v-if="!route.meta.hideTabBar"></tabBar>
  <loading />
</template>

<style scoped></style>
