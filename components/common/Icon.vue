<template>
  <svg
    class="icon"
    :class="icon"
  >
    <use
      :xlink:href="`#${icon}`"
      width="1em"
      height="1em"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon: string,
  size?: number
}>(), {
  size: 2
})

const icon = computed(() => `icon-${props.icon}`)
const size = computed(() => props.size + 'rem')
</script>

<style lang="scss" scoped>
.icon {
  width: v-bind(size);
  height: v-bind(size);
  display: inline-block;
  font-size: v-bind(size);
  fill: currentColor;
  overflow: hidden;
}
</style>
