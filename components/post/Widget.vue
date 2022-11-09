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

<style lang="scss" scoped>
.post-widget {
  .widget {
    color: var(--primary-text);

    @media screen and (max-width: 768px) {
      font-size: 12px;
      transform: scale(0.8);
    }
  }

  .icon {
    vertical-align: -3px;

    @media screen and (max-width: 768px) {
      font-size: 12px;
      vertical-align: -1px;
    }
  }
}
</style>
