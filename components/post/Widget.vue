<template>
  <div class="post-widget">
    <component
      :is="link ? NuxtLink : 'span'"
      :style="{ color }"
      :to="link"
      class="widget"
      :class="{ 'is-link': link }"
    >
      <CommonIcon
        v-if="icon"
        class="iconfont"
        :icon="icon"
      />
      {{ value }}
    </component>
  </div>
</template>

<script setup lang="ts">
import { RouteRecord } from 'vue-router'

defineProps<{
  value: string;
  icon?: string;
  link?: RouteRecord | string;
  color?: string;
}>()

const NuxtLink = resolveComponent('NuxtLink')
</script>
