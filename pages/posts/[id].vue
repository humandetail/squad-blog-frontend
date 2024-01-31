<template>
  <div class="posts">
    <h1 class="title">
      {{ postData.title }}
    </h1>

    <div
      v-if="widgets.length > 0"
      class="info"
    >
      <ArticleWidget
        v-for="(content, index) of widgets"
        :key="index"
        :content="content"
      />
    </div>

    <ArticleContent
      :post-data="postData"
    />

    <div class="tags">
      <CommonIcon
        icon="tags"
      />
      <ArticleTag
        v-for="tag of tags"
        :key="tag.value"
        :tag="tag"
      />
    </div>

    <div class="link-wrapper">
      <ArticleLink
        :link="prevLink"
      />
      <ArticleLink
        :link="nextLink"
        is-next
      />
    </div>

    <div
      ref="discussionsRef"
      class="discussions-wrapper"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { getPostDetail } from '~/config/api'
import type { ArticleTag, ArticleWidget } from '~/types'
import { dateFormat } from '~/utils'

const discussionsRef = ref<HTMLElement | null>(null)

useDiscussions(discussionsRef)

const route = useRoute()

const { data } = await getPostDetail(route.params.id as string)

const postData = computed(() => data.value.post)

const prevLink = computed(() => data.value.prev)
const nextLink = computed(() => data.value.next)

const widgets = computed(() => {
  if (!postData.value) return []

  const { category, viewCount, createdTime } = postData.value

  return [
    {
      value: category.displayName,
      icon: 'category',
      route: {
        path: `/categories/${category.name}`,
      }
    },
    {
      value: dateFormat(createdTime),
      icon: 'time'
    },
    {
      value: viewCount,
      icon: 'read'
    }
  ] as ArticleWidget[]
})

const tags = computed(() => {
  if (!postData.value) return []

  return postData.value.tags.map(({ name, displayName }) => {
    return {
      route: {
        path: `/tags/${name}`
      },
      value: displayName
    } as ArticleTag
  })
})

useHead({
  title: postData.value.title
})
</script>

<style lang="scss" scoped>
.title {
  padding-top: var(--gap-sm);
  font-size: 2.6rem;
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: .8rem 1.6rem;
  margin: 1.6rem 0 2.4rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .8rem 1.6rem;
  margin-top: 1.6rem;
  padding: 1.6rem 0;
  border-top: 1px solid var(--border-color);
}

.link-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: .8rem 1.6rem;
  margin-top: 1.6rem;

  :deep(> *) {
    flex: 1;
    min-width: 0;

    @media (max-width: 768px) {
      width: 100%;
      flex: auto;
    }
  }
}

.discussions-wrapper {
  margin-top: 3.2rem;
}
</style>
