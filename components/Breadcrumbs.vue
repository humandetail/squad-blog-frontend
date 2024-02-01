<template>
  <div class="breadcrumbs">
    <NuxtLink
      v-for="item of list"
      :key="item.value"
      :to="item.route"
      :custom="!item.route"
    >
      <span class="item">
        <CommonIcon
          v-if="item.icon"
          :icon="item.icon"
          :size="1.4"
        />

        {{ item.value }}
      </span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/types'

const props = defineProps<{
  breadcrumbs: Breadcrumb[]
}>()

const list = computed(() => {
  return [
    {
      value: '首页',
      route: { path: '/' },
      icon: 'location'
    },
    ...props.breadcrumbs
  ] as Breadcrumb[]
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--gap);
  height: 2.4rem;
  margin-bottom: var(--gap);

  a,
  .item {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--gap-sm) / 2);
    font-size: var(--font-size-sm);
  }

  .item {
    position: relative;

    &:not(a .item) {
      color: var(--secondary-text);
    }

    &:not(:first-child)::before {
      content: '';
      position: absolute;
      left: -.2rem;
      top: 50%;
      width: 1.2rem;
      height: .1rem;
      background-color: var(--border-color);
      transform-origin: center center;
      transform: translate(-100%, 0) rotate(120deg);
      transition: transform .1s ease-in;
    }

    &:hover::before {
      transform: translate(-100%, 0) rotate(0);
    }
  }
}
</style>
