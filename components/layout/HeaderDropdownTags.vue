<template>
  <section class="tags-wrapper">
    <header class="header">
      <h6 class="title">
        <span class="iconfont icon-tags" />
        文章标签
      </h6>
    </header>
    <ul class="tags">
      <li
        v-for="item in tags"
        :key="item.id"
        class="item"
      >
        <nuxt-link
          :to="`/categoires/${item.name}`"
        >
          {{ item.displayName }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { TAGS } from '~~/config/api'
import { TagsData, PageResponseType } from '~~/types/response'

const tags = useTags()

if (tags.value.length === 0) {
  const { data } = await useCustomFetch<PageResponseType<TagsData>>(TAGS)
  tags.value = data.value.records || []
}
</script>

<style lang="scss" scoped>
.tags-wrapper {
  width: 3.6rem;

  .title {
    display: flex;
    align-items: center;

    .iconfont {
      margin-right: .08rem;
      font-size: .2rem;
    }
  }

  .tags {
    display: flex;
    align-items: center;
    margin-top: .16rem;
    .item {
      a {
        display: inline-block;
        padding: 0 .16rem;
        color: var(--primary-text);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }

        &.router-link-exact-active {
          color: var(--plain-color);
        }
      }
    }
  }
}
</style>
