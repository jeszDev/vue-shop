<template>
  <!-- <label for="title" class="form-label">Título</label> -->

  <div>
    <textarea
      id="description"
      :type="text"
      :value="modelValue"
      :class="['form-control', { 'border-red-500': error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
      @blur="$emit(blur)"
    ></textarea>

    <span v-if="error" class="text-red-400">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  error?: string;
  type?: 'text' | 'number';
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});

defineEmits('update:modelvalue', 'blur');
</script>

<style scoped>
/*
.form-control {
  @apply shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline;
}
*/
</style>
