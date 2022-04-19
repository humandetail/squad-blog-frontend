<template>
  <article class="item">
    <CommonCoverPic
      :url="record.coverPic"
      :alt="record.title"
      :to="postLink"
      width="4.08rem"
      height="2.6rem"
    />

    <h2 class="title">
      <nuxt-link :to="postLink">
        {{ record.title }}
      </nuxt-link>
    </h2>

    <div class="widgets">
      <CommonPostWidget
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
import { formatDate } from '@vueuse/shared'
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
      value: formatDate(new Date(createdTime), 'YYYY-MM-DD'),
      icon: 'time'
    }
  ]
})
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.item {
  width: calc(50% - .24rem);
  margin-bottom: .48rem;
  border-radius: .16rem;
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

.title a {
  display: block;
  margin: .24rem;
  color: var(--primary-text);
  font-size: .24rem;
  line-height: 2;
  text-decoration: none;
  @include ellipsis;

  &:hover {
    color: var(--brand-color);
  }
}
.widgets {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: -.16rem .24rem .24rem;

  > * {
    margin: .16rem .16rem 0 0;
  }
}
</style>
