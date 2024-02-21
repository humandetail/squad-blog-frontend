<template>
  <NuxtLink
    :custom="!content.route"
    :to="content.route"
  >
    <div
      class="article-widget"
      :style="content.color ? `color: ${content.color?.startsWith('--') ? `var(${content.color})` : content.color}` : ''"
    >
      <CommonIcon
        v-if="content.icon"
        :icon="content.icon"
        :size="1.6"
      />

      <span class="value">
        {{ content.value }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ArticleWidget } from '~/types'

defineProps<{
  content: ArticleWidget
}>()
</script>

<style lang="scss" scoped>
a {
  display: inline-flex;
  align-items: center;
  height: 2rem;
}
.article-widget {
  display: inline-flex;
  gap: .4rem;
  align-items: center;
  height: 2rem;
  color: var(--secondary-text);

  .value {
    font-size: 1.4rem;
  }
}

a {
  text-decoration: none;

  &:hover {
    text-decoration: underline dashed;

    .article-widget {
      color: var(--primary-color);
    }
  }
}
</style>
