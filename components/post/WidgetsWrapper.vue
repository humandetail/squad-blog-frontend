<template>
  <section class="post-widgets">
    <PostWidget
      :value="post.category.displayName"
      :link="`/categories/${post.category.name}`"
      icon="category"
    />

    <PostWidget
      :value="post.author"
      :link="`/about`"
      icon="user"
    />

    <PostWidget
      :value="formatDate(post.createdTime)"
      icon="time"
    />

    <PostWidget
      :value="post.viewCount + ''"
      icon="read"
    />

    <nuxt-link
      v-for="item in post.tags"
      :key="item.name"
      class="post-tag"
      :to="`/tags/${item.name}`"
    >
      {{ item.name }}
    </nuxt-link>
  </section>
</template>

<script setup lang="ts">
import { PostData } from '~~/types/response'
import { formatDate } from '~~/libs/utils'

defineProps<{
  post: PostData
}>()
</script>

<style lang="scss" scoped>
.post-widgets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap16);
  margin: var(--gap24) 0;
  line-height: 28px;

  .post-tag {
    align-items: center;
    padding: 0 var(--gap16);
    color: var(--primary-text);
    border-radius: 4px;
    box-shadow: 1px 1px 2px var(--shadow-color-dark), -1px -1px 2px var(--shadow-color-light);

    &:focus,
    &:hover {
      text-decoration: none;
    }

    &:hover {
      color: var(--success-color);
    }

    &:active {
      box-shadow: 1px 1px 2px var(--shadow-color-dark) inset, -1px -1px 2px var(--shadow-color-light) inset;
    }
  }
}
</style>
