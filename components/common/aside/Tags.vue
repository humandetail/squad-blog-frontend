<template>
  <section class="hot">
    <header class="header">
      <h2 class="title">
        标签
      </h2>
    </header>

    <ul class="list">
      <li
        v-for="item of records"
        :key="item.id"
        class="item"
      >
        <NuxtLink :to="`/tags/${item.name}`">
          {{ item.displayName }}
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { getTags } from '~/config/api'

const { data } = await getTags()

const records = computed(() => data.value?.records ?? [])
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-sm) var(--gap);
  margin-top: var(--gap);
  font-size: 1.4rem;
  line-height: 2rem;

  a:hover {
    text-decoration: underline;
  }
}
</style>
