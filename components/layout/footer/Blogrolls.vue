<template>
  <section class="blogrolls">
    <header class="header">
      <h3 class="title">
        <span class="iconfont icon-share" />
        友情链接
      </h3>
    </header>

    <ul class="list">
      <li
        v-for="item in blogrolls"
        :key="item.id"
        class="item"
      >
        <a
          :href="item.link"
          target="_blank"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { BLOGROLLS } from '~~/config/api'
import { PageResponseType, BlogrollsData } from '~~/types/response'

const blogrolls = useBlogrolls()

if (!blogrolls.value) {
  const { data } = await useCustomFetch<PageResponseType<BlogrollsData>>(BLOGROLLS)
  blogrolls.value = data.value.records || []
}
</script>

<style lang="scss" scoped>
.blogrolls {
  color: var(--plain-color);

  .header {
    .title {
      display: flex;
      align-items: center;
      .iconfont {
        margin-right: .16rem;
        font-size: .48rem;
      }
    }
  }

  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item {
      margin: .12rem;

      a {
        color: inherit;
      }
    }
  }
}
</style>
