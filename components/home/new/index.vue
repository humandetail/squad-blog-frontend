<template>
  <section class="posts-new">
    <header class="header">
      <h1 class="title">
        <span class="iconfont icon-quote-left" />
        <span>
          最新文章
        </span>
      </h1>
    </header>

    <div class="track" />

    <CommonLoading :loading="pending">
      <ul class="posts">
        <li
          v-for="item in records"
          :key="item.id"
          class="item"
        >
          <div class="placeholder">
            <PostWidget
              :value="getTime(item.createdTime)"
              icon="time"
            />
          </div>
          <article class="post-item">
            <h2 class="title">
              <nuxt-link :to="`/posts/${item.id}`">
                {{ item.title }}
              </nuxt-link>
            </h2>

            <div class="content">
              <CommonCoverPic
                :url="item.coverPic"
                :alt="item.title"
                :to="`/posts/${item.id}`"
              />

              <div class="info">
                <div class="summary">
                  {{ item.summary }}
                </div>

                <div class="widgets">
                  <PostWidget
                    :value="item.categoryDisplayName"
                    :link="`/categories/${item.categoryName}`"
                    icon="category"
                  />
                  <PostWidget
                    :value="item.author"
                    link="/about"
                    icon="user"
                  />
                  <PostWidget
                    v-show="false"
                    class="time"
                    :value="getTime(item.createdTime)"
                    icon="time"
                  />
                </div>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { formatDate } from '~~/libs/utils'
import { getNewPosts } from '~~/config/api'

const { data, pending } = await getNewPosts()

const records = computed(() => data.value.records)

const getTime = (dateLinkString: string) => formatDate(dateLinkString, 'YYYY年M月D日')

</script>
