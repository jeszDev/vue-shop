<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
      :disabled="isFirstPage"
      @click="$router.push({ query: { page: page - 1 } })"
    >
      <ArrowLeftIcon />
      <span>Anteriores</span>
    </button>

    <button
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300"
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
    >
      <span>Siguientes</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';

interface Props {
  page: number;
  isFirstPage: boolean;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>

<style scoped></style>
