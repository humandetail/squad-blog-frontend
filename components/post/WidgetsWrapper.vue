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
