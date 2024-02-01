<template>
  <article class="article-item">
    <h2
      class="title ellipsis"
      :title="record.title"
    >
      <NuxtLink
        :to="postLink"
      >
        {{ record.title }}
      </NuxtLink>
    </h2>

    <div
      class="summary"
      :title="record.summary"
    >
      <div>
        {{ record.summary }}
      </div>
    </div>
    <div class="widgets">
      <ArticleWidget
        v-for="(content, index) of widgets"
        :key="index"
        :content="content"
      />
    </div>
    <ArticleCover
      :cover="cover"
    />
  </article>
</template>

<script setup lang="ts">
import type { ArticleCover, ArticleWidget } from '~/types'
import type { PostItem } from '~/types/response'

const props = defineProps<{
  record: PostItem
}>()

const postLink = computed(() => ({ path: `/posts/${props.record.id}` }))

const widgets = computed(() => {
  const { createdTime, tags, categoryName, categoryDisplayName } = props.record

  return [
    {
      value: dateFormat(createdTime),
      icon: 'time'
    },
    ...(categoryName && categoryDisplayName ? [{
      value: categoryDisplayName,
      route: {
        path: `/categories/${categoryName}`,
      }
    }] : []),
    ...(tags ?? []).map(tag => {
      return {
        value: tag.displayName,
        route: {
          path: `/tags/${tag.name}`,
        }
      }
    })
  ] as ArticleWidget[]
})

const cover = computed(() => {
  return {
    route: postLink.value,
    src: props.record.coverPic,
    alt: props.record.title
  } as ArticleCover
})
</script>

<style lang="scss" scoped>
.article-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 2.4rem);
  gap: var(--gap-sm) var(--gap);
  align-items: center;
  padding: var(--gap) 0;
  border-bottom: 1px dashed var(--border-color);
  overflow: hidden;

  &:hover {
    border-bottom-style: solid;
    border-bottom-color: var(--primary-color);
  }

  .title {
    grid-row: 1 / 2;
    grid-column: 1 / 4;
    font-size: var(--font-size-lg);
    cursor: pointer;

    a {
      text-decoration: none;
    }

    &:hover {
      color: var(--primary-color);
    }
  }

  .summary {
    position: relative;
    grid-row: 2 / 4;
    grid-column: 1 / 4;
    max-height: 4.8rem;
    line-height: 2.4rem;
    font-size: var(--font-size-sm);
    overflow: hidden;

    &::before {
      content: '';
      float: left;
      width: 4.8rem;
      height: 4.8rem;
    }

    > div {
      float: right;
      width: 100%;
      margin-left: -4.8rem;
      word-break: break-all;
    }

    &::after {
      content: '...';
      float: right;
      position: relative;
      left: 100%;
      width: 4.8rem;
      height: 2.4rem;
      text-align: right;
      color: var(--secondary-text);
      background-image: linear-gradient(to right, transparent, var(--bg) 50%, var(--bg) 51%, var(--bg));
      transform: translate(-100%, -100%);
    }
  }

  .widgets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-sm);
    grid-row: 4 / 4;
    grid-column: 1 / 4;
  }

  :deep(.cover) {
    grid-row: 1 / 5;
    grid-column: 4 / 5;
    align-items: flex-end;
  }
}
</style>
