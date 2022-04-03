<template>
  <section class="categories-wrapper">
    <header class="header">
      <h6 class="title">
        <span class="iconfont icon-category" />
        文章分类
      </h6>
    </header>
    <ul class="categories">
      <li
        v-for="item in categories"
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
import { CATEGORIES } from '~~/config/api'
import { CategoriesData, PageResponseType } from '~~/types/response'

const categories = useCategories()

if (categories.value.length === 0) {
  const { data } = await useCustomFetch<PageResponseType<CategoriesData>>(CATEGORIES)
  categories.value = data.value.records || []
}
</script>

<style lang="scss" scoped>
.categories-wrapper {
  width: 1.2rem;

  .title {
    display: flex;
    align-items: center;

    .iconfont {
      margin-right: .08rem;
      font-size: .2rem;
    }
  }

  .categories {
    margin-top: .16rem;
    .item {
      & + .item {
        margin-top: .08rem;
      }

      a {
        display: inline-block;
        padding: 0 .16rem;
        color: var(--primary-text);
        text-decoration: none;

        &:hover {
          color: var(--brand-color);
        }

        &.router-link-exact-active {
          background-color: var(--brand-color);
          color: var(--plain-color);
        }
      }
    }
  }
}
</style>
