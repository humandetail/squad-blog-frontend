<template>
  <article class="item">
    <CommonCoverPic
      :url="record.coverPic"
      :alt="record.title"
      :to="postLink"
    />

    <h2 class="title">
      <nuxt-link :to="postLink">
        {{ record.title }}
      </nuxt-link>
    </h2>

    <div class="summary">
      {{ record.summary }}
    </div>

    <div class="widgets">
      <PostWidget
        v-for="item in widgets"
        :key="item.id"
        :value="item.value"
        :link="item.link"
        :icon="item.icon"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { formatDate } from '~~/libs/utils'
import { PostItem } from '~~/types/response'

const props = defineProps<{
  record: PostItem
}>()

const postLink = computed(() => `/posts/${props.record.id}`)

const widgets = computed(() => {
  const {
    categoryName,
    categoryDisplayName,
    author,
    createdTime
  } = props.record
  return [
    {
      id: 1,
      value: categoryDisplayName,
      link: `/categories/${categoryName}`,
      icon: 'category'
    },
    {
      id: 2,
      value: author,
      link: '/about',
      icon: 'user'
    },
    {
      id: 3,
      value: formatDate(createdTime),
      icon: 'time'
    }
  ]
})
</script>

<style lang="scss" scoped>
.item {
  display: grid;
  gap: var(--gap16);

  .title {
    min-width: 0;

    a {
      display: block;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
  }

  .summary {
    min-width: 0;

    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }

  .widgets {
    display: flex;
    align-items: center;
    gap: var(--gap16);
    min-width: 0;
  }
}
</style>
