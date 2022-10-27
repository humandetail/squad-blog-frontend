<template>
  <div class="posts-page">
    <CommonLoading :loading="pending">
      <article class="post-container">
        <h1 class="title">
          {{ post.title }}
        </h1>

        <PostWidgetsWrapper :post="post" />

        <div
          class="content squad__post-content"
          v-html="content"
        />

        <section class="post-link-wrapper">
          <PostLink
            key="prev"
            :is-prev="true"
            :post-link="prev"
          />

          <PostLink
            key="next"
            :is-prev="false"
            :post-link="next"
          />
        </section>
      </article>

      <aside class="post-toc-wrapper">
        <header>目录</header>
        <div class="toc" v-html="toc" />
      </aside>
    </CommonLoading>
  </div>
</template>

<script setup lang="ts">
import { getPostDetail } from '~~/config/api'

const { $markdownRender } = useNuxtApp()
const route = useRoute()

// lifecycle hooks must before the first await statement.
onMounted(() => {
  if (post.value.content) {
    const HTMLString = $markdownRender(`[TOC]\n${post.value.content}`)
    const reg = /<nav class="table-of-contents">.*?<\/nav>/

    const result = HTMLString.match(reg)

    if (result) {
      toc.value = result[0]
      content.value = HTMLString.replace(reg, '')
    }
  }
  isMounted.value = true
})

const { data, pending } = await getPostDetail(route.params.id as string)

const post = computed(() => data.value.post)
const prev = computed(() => data.value.prev || null)
const next = computed(() => data.value.next || null)

const content = ref(post.value.content || '')
const toc = ref('')
const isMounted = ref(false)
</script>
