<template>
  <section class="blogroll">
    <CommonIcon
      icon="link"
      :size="1.6"
    />

    <ul class="list">
      <li
        v-for="item of records"
        :key="item.id"
        class="item"
      >
        <a
          :href="item.link"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { getBlogroll } from '~/config/api'

const { data } = await getBlogroll()

const records = computed(() => data.value?.records ?? [])
</script>

<style lang="scss" scoped>
.blogroll {
  display: flex;
  gap: var(--gap-sm);
  
  :deep(.icon) {
    white-space: nowrap;
    margin-top: .2rem;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--gap-sm) var(--gap);
    flex: 1;

    .item {
      line-height: 2rem;

      a {
        color: var(--primary-text);
      }
    }
  }
}
</style>
