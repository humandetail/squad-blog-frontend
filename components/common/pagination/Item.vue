<template>
  <button
    v-for="item in list"
    :key="item"
    :disabled="item === currentPage"
    class="btn btn-page"
    :class="{ current: item === currentPage }"
    @click="$emit('update:current-page', item)"
  >
    {{ item }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  start: number;
  end: number;
  currentPage: number;
}>()

defineEmits<{(e: 'update:current-page', value: number)}>()

const list = computed(() => {
  const start = Math.max(1, props.start)

  const arr: number[] = []

  for (let i = start; i <= props.end; i++) {
    arr.push(i)
  }

  return arr
})
</script>
