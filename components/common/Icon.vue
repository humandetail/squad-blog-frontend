<template>
  <svg
    class="icon"
    :class="icon"
  >
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon: string,
  size?: number
}>(), {
  size: 16
})

const icon = computed(() => `icon-${props.icon}`)
const size = computed(() => props.size + 'px')
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  font-size: v-bind(size);
  overflow: hidden;
}
</style>
