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

<style lang="scss" scoped>
.aside-recommended {
  margin-bottom: var(--gap24);

  .list {
    padding: 4px 0;

    .item {
      margin-top: var(--gap16);

      .item-link {
        display: flex;
        align-items: center;
        gap: var(--gap16);
        color: var(--primary-text);

        .cover-pic {
          width: 100px;
        }

        .title {
          flex: 1;
          font-size: 16px;
          line-height: 20px;
          max-height: 40px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
