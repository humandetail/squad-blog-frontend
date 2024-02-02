<template>
  <NuxtLink
    :to="postLink"
    target="_blank"
  >
    <article class="article-item">
      <h2
        class="title ellipsis"
        :title="record.title"
        v-html="replaceKeyword(record.title, keyword)"
      ></h2>

      <div
        class="summary"
        :title="record.summary"
      >
        <NuxtLink
          :to="`/categories/${record.categoryName}`"
          class="category"
        >
          [{{ record.categoryDisplayName }}]
        </NuxtLink>
        <span class="date">{{ dateFormat(record.createdTime) }} - </span>
        <span v-html="replaceKeyword(record.summary, keyword)"></span>
      </div>

      <div class="widgets">
        <CommonIcon
          icon="tags"
          :size="1.4"
        />
        <ArticleWidget
          v-for="(content, index) of widgets"
          :key="index"
          :content="content"
        />
      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ArticleWidget } from '~/types'
import type { PostItem } from '~/types/response'
import { replaceKeyword } from '~/utils'

const props = defineProps<{
  keyword: string
  record: PostItem
}>()

const postLink = computed(() => ({ path: `/posts/${props.record.id}` }))

const widgets = computed(() => {
  const { tags } = props.record

  return (tags ?? []).map(tag => {
    return {
      value: tag.displayName,
      route: {
        path: `/tags/${tag.name}`,
      }
    }
  }) as ArticleWidget[]
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  cursor: default;
}

.article-item {
  padding: var(--gap) 0;
  border-bottom: 1px dashed var(--border-color);
  overflow: hidden;
  color: var(--primary-text);

  &:hover {
    border-bottom-style: solid;
    border-bottom-color: var(--primary-color);
  }

  :deep(a) {
    cursor: pointer;
  }

  .title {
    font-size: var(--font-size-lg);
    cursor: pointer;
  }

  .summary {
    padding: var(--gap-sm) 0;
    line-height: 2.4rem;
    font-size: var(--font-size-sm);

    .date {
      color: var(--secondary-text);
    }
  }

  .widgets {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--gap-sm);
  }
}
</style>
