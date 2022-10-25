<template>
  <section class="aside-recommended">
    <LayoutAsideRightHeader
      title="推荐文章"
      icon="star"
    />

    <CommonLoading :loading="pending">
      <ol class="list">
        <li
          v-for="item in records"
          :key="item.id"
          class="item"
        >
          <nuxt-link
            :to="`/posts/${item.id}`"
            class="item-link"
          >
            <div class="cover-pic">
              <img
                :src="item.coverPic"
                :alt="item.title"
              >
            </div>

            <h3 class="title">
              {{ item.title }}
            </h3>
          </nuxt-link>
        </li>
      </ol>
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { getRecommendedPosts } from '~~/config/api'
import { PostItem } from '~~/types/response'

const records = ref<PostItem[]>([])
const { data, pending } = await getRecommendedPosts(1, 5)
records.value = data.value.records || []
</script>
