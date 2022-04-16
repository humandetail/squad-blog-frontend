<template>
  <article class="result-item">
    <h2 class="title">
      <nuxt-link
        :to="`/posts/${record.id}`"
        v-html="title"
      />
    </h2>

    <div class="content">
      <span class="date">{{ date }} - </span>
      <span v-html="summary" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { PostItem } from '~~/types/response'

const props = defineProps<{
  record: PostItem;
  keyword: string;
}>()

const date = computed(() => {
  const createdTime = new Date(props.record.createdTime)

  return `${createdTime.getFullYear()}年${(createdTime.getMonth() + 1).toString().padStart(2, '0')}月${createdTime.getDate().toString().padStart(2, '0')}日`
})
const title = computed(() => replaceKeyword(props.record.title))
const summary = computed(() => replaceKeyword(props.record.summary))

const replaceKeyword = (value: string) => {
  return value.replace(new RegExp(`(${props.keyword})`, 'i'), '<span class="keyword">$1</span>')
}
</script>

<style scoped lang="scss">
@import '~~/assets/styles/mixins.scss';

.result-item {
  margin: .24rem 0;
  padding: .16rem;
  background-color: var(--plain-color);
  border-radius: .16rem;
  box-shadow: var(--box-shadow);

  &:hover {
    box-shadow: var(--box-shadow);
  }

  .title {
    line-height: 1.4;
    font-size: .2rem;
    @include ellipsis;
  }

  .content {
    margin-top: .16rem;
    @include multi-ellipsis(4);

    .date {
      color: var(--secondary-text);
    }
  }

  ::v-deep(.keyword){
    color: var(--danger-color);
  }
}
</style>
