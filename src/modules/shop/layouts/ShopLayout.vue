<template>
  <TopMenu />

  <RouterView />

  <CustomFooter />
</template>

<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';
</script>

<style scoped></style>
