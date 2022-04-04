<template>
  <article class="search-results">
    <SearchResultItem
      v-for="record in records"
      :key="record.id"
      :record="record"
      :keyword="keyword"
    />
  </article>
</template>

<script setup lang="ts">
import { PostItem } from '~~/types/response'

defineProps<{
  records: PostItem[];
  keyword: string
}>()
</script>
