<template>
  <article class="result-item">
    <h2 class="title">
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <nuxt-link :to="`/posts/${record.id}`" v-html="title" />
    </h2>

    <div class="content">
      <span class="date">{{ date }} - </span>
      <span v-html="summary" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { PostItem } from '~~/types/response'
import { formatDate } from '~~/libs/utils'

const props = defineProps<{
  record: PostItem;
  keyword: string;
}>()

const date = computed(() => formatDate(props.record.createdTime, 'YYYY年MM月DD日'))

const title = computed(() => replaceKeyword(props.record.title))
const summary = computed(() => replaceKeyword(props.record.summary))

const replaceKeyword = (value: string) => {
  return value.replace(new RegExp(`(${props.keyword})`, 'i'), '<span class="keyword">$1</span>')
}
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.result-item {
  &:not(:first-child) {
    margin-top: var(--gap16);
  }

  .title {
    @include ellipsis()
  }

  .content {
    margin-top: var(--gap8);
    .date {
      color: var(--secondary-text);
    }
  }

  :deep(.keyword) {
    color: var(--danger-color);
  }
}
</style>
