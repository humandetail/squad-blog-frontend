<template>
  <nuxt-link
    v-if="to"
    :to="to"
    class="cover-pic-with-link"
  >
    <figure class="cover-pic">
      <img
        v-if="lazy"
        :class="lazyClassName"
        :data-src="url"
        :style="{ maxWidth: width, maxHeight: height }"
      >
      <img
        v-else
        v-lazy="url"
        :style="{ maxWidth: width, maxHeight: height }"
      >
    </figure>
  </nuxt-link>
  <figure v-else class="cover-pic">
    <img
      v-if="lazy"
      :class="lazyClassName"
      :data-src="url"
      :style="{ maxWidth: width, maxHeight: height }"
    >
    <img
      v-else
      v-lazy="url"
      :style="{ maxWidth: width, maxHeight: height }"
    >
  </figure>
</template>

<script setup lang="ts">
import { RouteRecord } from 'vue-router'

const props = withDefaults(defineProps<{
  url: string;
  to?: RouteRecord | string;
  width?: string;
  height?: string;
  // custom lazyload
  lazy?: boolean;
  lazyClassName?: string;
}>(), {
  to: '',
  width: '440px',
  height: '280px',
  lazy: false,
  lazyClassName: ''
})

const { width, height } = props
</script>

<style lang="scss" scoped>
$width: v-bind(width);
$height: v-bind(height);

.cover-pic-with-link {
  width: $width;
  height: $height;
}

.cover-pic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: $width;
  height: $height;
  background-color: var(--img-background);

  img {
    display: block;
    width: auto !important;
    height: auto !important;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
