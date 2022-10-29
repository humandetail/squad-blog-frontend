<template>
  <section class="search-results">
    <SearchResultItem
      v-for="record in records"
      :key="record.id"
      :record="record"
      :keyword="keyword"
    />
  </section>
</template>

<script setup lang="ts">
import { PostItem } from '~~/types/response'
defineProps<{
  records: PostItem[];
  keyword: string
}>()
</script>

<style lang="scss" scoped>
.search-results {
  margin-top: var(--gap24);
}
</style>
