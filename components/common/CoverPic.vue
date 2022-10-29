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
        :alt="alt"
      >
      <img
        v-else
        v-lazy="url"
        :style="{ maxWidth: width, maxHeight: height }"
        :alt="alt"
      >
    </figure>
  </nuxt-link>
  <figure v-else class="cover-pic">
    <img
      v-if="lazy"
      :class="lazyClassName"
      :data-src="url"
      :style="{ maxWidth: width, maxHeight: height }"
      :alt="alt"
    >
    <img
      v-else
      v-lazy="url"
      :style="{ maxWidth: width, maxHeight: height }"
      :alt="alt"
    >
  </figure>
</template>

<script setup lang="ts">
import { RouteRecord } from 'vue-router'

withDefaults(defineProps<{
  url: string;
  to?: RouteRecord | string;
  width?: string;
  height?: string;
  // custom lazyload
  lazy?: boolean;
  lazyClassName?: string;
  alt?: string;
}>(), {
  to: '',
  width: '440px',
  height: '280px',
  lazy: false,
  lazyClassName: '',
  alt: ''
})

// const { width, height } = props
</script>

<style lang="scss" scoped>
.cover-pic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--cover-bg);
  overflow: hidden;

  img {
    transition: transform ease-in-out .3s;
    transform-origin: center center;
  }

  &:hover img {
    transform: scale(1.5);
  }
}
</style>
