<template>
  <button
    class="btn"
    :class="prev ? 'btn-first' : 'btn-last'"
    @click="$emit('update:current-page', prev ? Math.max(current - 5, 1) : Math.min(pageCount, current + 5))"
  >
    <CommonIcon :icon="prev ? 'double-left' : 'double-right'" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  prev: boolean;
  current: number;
  pageCount: number;
}>()

defineEmits<{(e: 'update:current-page', value: number)}>()
</script>
