<template>
  <div class="posts-page">
    <CommonLoading :loading="pending">
      <article class="post-container">
        <h1 class="title">
          {{ post.title }}
        </h1>

        <PostWidgetsWrapper :post="post" />

        <div
          ref="contentRef"
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
    </CommonLoading>

    <ClientOnly>
      <Teleport to="#post-toc">
        <aside class="post-toc-wrapper">
          <LayoutAsideRightHeader
            title="目录"
            icon="menu"
          />
          <div class="toc" v-html="toc" />
        </aside>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import PrettyPreview from 'pretty-preview'
import { getPostDetail } from '~~/config/api'

import 'pretty-preview/index.css'

useCodeCopy()

const themeMode = useThemeMode()
const contentRef = ref<HTMLDivElement>()

const hljsStylesheetLink = computed(() => [
  {
    rel: 'stylesheet',
    href: themeMode.value === 'dark'
      ? 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/github-dark.min.css'
      : 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/github.min.css'
  }
])

useHead({
  link: hljsStylesheetLink
})

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

  nextTick(() => {
    // eslint-disable-next-line no-new
    new PrettyPreview({
      root: contentRef.value
    })
  })
})

const { data, pending } = await getPostDetail(route.params.id as string)

const post = computed(() => data.value.post)
const prev = computed(() => data.value.prev || null)
const next = computed(() => data.value.next || null)

const content = ref(post.value.content || '')
const toc = ref('')
const isMounted = ref(false)
</script>

<style lang="scss">
@import '~~/assets/styles/post.scss';
</style>

<style lang="scss" scoped>
.content {
  position: relative;
  margin-top: var(--gap24);
  padding: var(--gap24) 0;
  border-top: 1px solid var(--shadow-color-light);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -3px;
    width: 100%;
    height: 1px;
    background-color: var(--shadow-color-dark);
  }
}

.post-link-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap32);
  position: relative;
  margin: var(--gap24) 0;
  padding: var(--gap16) 0;
  border-top: 1px solid var(--shadow-color-light);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -3px;
    width: 100%;
    height: 1px;
    background-color: var(--shadow-color-dark);
  }

  :deep(.post-link) {
    width: calc(50% - var(--gap16));
  }
}

.toc {
  margin-top: var(--gap16);

  :deep(.table-of-contents) {
    ol {
      margin-left: 1em;
      list-style: decimal;
    }

    a {
      color: var(--primary-text);
      font-size: 14px;
    }

    li {
      margin-top: 8px;
    }
  }
}
</style>
