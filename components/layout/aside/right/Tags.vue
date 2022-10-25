<template>
  <section class="aside-tags">
    <LayoutAsideRightHeader
      title="标签归档"
      icon="tags"
    />

    <CommonLoading :loading="loading">
      <ul class="list">
        <li
          v-for="item in tags"
          :key="item.id"
          class="item"
        >
          <nuxt-link
            :to="`/tags/${item.name}`"
            class="tag"
          >
            {{ item.displayName }}
            (<span class="count">
              {{ item.postCount }}
            </span>)
          </nuxt-link>
        </li>
      </ul>
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { getTags } from '~~/config/api'

const tags = useTags()

const loading = ref(false)

if (tags.value.length === 0) {
  loading.value = true
  const { data } = await getTags()

  tags.value = data.value.records || []
  loading.value = false
}

</script>
