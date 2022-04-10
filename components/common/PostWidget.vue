<template>
  <div class="post-widget">
    <component
      :is="link ? NuxtLink : 'span'"
      :style="{ color }"
      :to="link"
      class="widget"
      :class="{ 'is-link': link }"
    >
      <span
        v-if="icon"
        class="iconfont"
        :class="`icon-${icon}`"
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
  display: inline-block;

  .widget {
    display: inline-flex;
    align-items: center;
    color: var(--primary-text);

    &.is-link {
      text-decoration: none;

      &:hover {
        color: var(--brand-color);
      }
    }

    .iconfont {
      margin-right: .04rem;
      font-size: .16rem;
    }
  }
}
</style>
