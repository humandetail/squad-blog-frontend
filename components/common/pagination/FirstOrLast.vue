<template>
  <button
    class="btn"
    :class="prev ? 'btn-first' : 'btn-last'"
    @click="$emit('update:current-page', prev ? 1 : pageCount)"
  >
    <span
      class="iconfont"
      :class="prev ? 'icon-double-left' : 'icon-double-right'"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  prev: boolean;
  pageCount: number;
}>()

defineEmits<{(e: 'update:current-page', value: number)}>()
</script>
