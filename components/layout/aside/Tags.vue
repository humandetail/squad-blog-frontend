<template>
  <section class="aside-tags">
    <LayoutAsideHeader
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
import { TAGS } from '~~/config/api'
import { PageResponseType, TagsData } from '~~/types/response'

const tags = useTags()

const loading = ref(false)

if (tags.value.length === 0) {
  loading.value = true
  const { data } = await useCustomFetch<PageResponseType<TagsData>>(TAGS)
  tags.value = data.value.records || []
  loading.value = false
}
</script>

<style lang="scss" scoped>
.aside-tags {
  padding: var(--aside-padding);
  border-radius: var(--border-radius);
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item {
      margin: .08rem;

      .tag {
        color: var(--primary-text);

        .count {
          color: var(--pink-color);
        }
      }
    }
  }
}
</style>
