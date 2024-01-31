<template>
  <NuxtLink
    :to="tag.route"
    class="tag"
  >
    {{ tag.value }}
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ArticleTag } from '~/types'

defineProps<{
  tag: ArticleTag
}>()
</script>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  align-items: center;
  height: 3.2rem;
  padding: 0 0.8rem;
  font-size: 1.4rem;
  color: var(--primary-text);
  border-radius: .4rem;
  background-color: var(--btn-bg);
  text-decoration: none;
  transition: background .3s ease-in;

  &:hover {
    color: var(--white);
    background-color: var(--primary-color);
  }
}
</style>
