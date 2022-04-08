<template>
  <section class="post-widgets">
    <CommonPostWidget
      :value="post.category.displayName"
      :link="`/categories/${post.category.name}`"
      icon="category"
    />

    <CommonPostWidget
      :value="post.author"
      :link="`/about`"
      icon="user"
    />

    <CommonPostWidget
      :value="dateFormat(post.createdTime)"
      icon="time"
    />

    <CommonPostWidget
      :value="post.viewCount + ''"
      icon="read"
    />

    <PostsWidgetsTag
      v-for="item in post.tags"
      :key="item.name"
      :tag="item"
    />
  </section>
</template>

<script setup lang="ts">
import { PostData } from '~~/types/response'

defineProps<{
  post: PostData
}>()

const dateFormat = (dateOrString: Date | string) => {
  return useDateFormat(new Date(dateOrString), 'YYYY-MM-DD').value
}
</script>

<style lang="scss" scoped>
.post-widgets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: .32rem -.08rem 0;

  > * {
    margin: .08rem;
  }

  ::v-deep(.post-widget) {
    color: var(--secondary-text);

    * {
      color: inherit;
    }

    .iconfont {
      font-size: .2rem;
    }
  }
}
</style>
