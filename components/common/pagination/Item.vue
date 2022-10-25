<template>
  <button
    :disabled="value === currentPage"
    class="btn btn-page"
    :class="{ current: value === currentPage }"
    @click="$emit('update:current-page', value)"
  >
    {{ value }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  value: number;
  currentPage: number;
}>()

defineEmits<{(e: 'update:current-page', value: number)}>()
</script>
