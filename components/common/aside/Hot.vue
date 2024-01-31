<template>
  <section class="hot">
    <header class="header">
      <h2 class="title">
        热门推荐
      </h2>
    </header>

    <ul class="list">
      <li
        v-for="item of records"
        :key="item.id"
        class="item"
      >
        <article>
          <NuxtLink :to="`/posts/${item.id}`">
            {{ item.title }}
          </NuxtLink>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { getRecommendedPosts } from '~/config/api'

const { data } = await getRecommendedPosts(1, 10)

const records = computed(() => data.value?.records ?? [])
</script>

<style lang="scss" scoped>
.list {
  margin-top: var(--gap);

  .item {
    position: relative;
    padding-left: 1.6rem;
    line-height: 2rem;
    font-size: 1.4rem;

    &::before {
      content: '';
      position: absolute;
      left: .4rem;
      top: .8rem;
      width: .4rem;
      height: .4rem;
      background-color: currentColor;
      transform-origin: center center;
      transform: rotate(45deg);
      transition: transform .1s ease-in;
    }

    &:hover::before {
      // transform: rotate(0);
      background-color: var(--primary-color);
      animation: ani .3s linear forwards;
    }

    a {
      color: var(--primary-text);
      text-decoration: none;

      &:hover {
        color: var(--primary-color);
      }
    }

    & + .item {
      margin-top: var(--gap-sm);
    }
  }
}

@keyframes ani {
  0% {
    transform: rotate(45deg) scale(2);
  }
  50% {
    transform: rotate(45deg) scale(1);
  }
  50.1%, 100% {
    transform: rotate(0) scale(1);
  }
}
</style>
