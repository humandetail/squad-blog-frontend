<template>
  <div class="home">
    <ArticleItem1
      v-for="record of records"
      :key="record.id"
      :record="record"
    />
  </div>
</template>

<script setup lang="ts">
import { getNewPosts } from '~/config/api'

const { data } = await getNewPosts()

const records = computed(() => data.value?.records ?? [])
</script>