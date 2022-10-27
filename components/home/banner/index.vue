<template>
  <section class="banner">
    <CommonLoading :loading="pending">
      <article
        v-for="item in records"
        :key="item.id"
        class="post-item"
      >
        <div class="content">
          <h2 class="title">
            <nuxt-link
              :to="`/posts/${item.id}`"
            >
              {{ item.title }}
            </nuxt-link>
          </h2>

          <div class="summary">
            {{ item.summary }}
          </div>

          <div class="extra">
            <nuxt-link
              :to="`/posts/${item.id}`"
              class="btn-more"
            >
              查看更多
            </nuxt-link>
          </div>
        </div>
        <div class="cover">
          <CommonCoverPic
            :url="item.coverPic"
            :alt="item.title"
            :to="`/posts/${item.id}`"
          />
        </div>
      </article>
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { getRecommendedPosts } from '~~/config/api'

const { data, pending } = await getRecommendedPosts(1, 5)

const records = computed(() => data.value.records)
</script>
