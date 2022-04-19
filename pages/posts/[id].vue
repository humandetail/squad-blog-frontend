<template>
  <NuxtLayout name="posts">
    <CommonBreadcrumb
      :routes="routes"
    />

    <CommonLoading :loading="pending">
      <div class="posts-page">
        <SkeletonPostsContent v-if="!isMounted" />

        <article v-else class="post-container">
          <h1 class="title">
            {{ post.title }}
          </h1>

          <PostsWidgets :post="post" />

          <div
            class="content squad__post-content"
            v-html="content"
          />

          <section class="post-link-wrapper">
            <PostsLink
              key="prev"
              :is-prev="true"
              :post-link="prev"
            />

            <PostsLink
              key="next"
              :is-prev="false"
              :post-link="next"
            />
          </section>
        </article>
      </div>
    </CommonLoading>

    <template #toc>
      <CommonLoading :loading="pending">
        <SkeletonPostsTOC v-if="!isMounted" />
        <section v-else class="post-toc-wrapper">
          <header>大纲</header>
          <div class="toc" v-html="toc" />
        </section>
      </CommonLoading>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { POSTS_DETAIL } from '~~/config/api'
import { BreadcrumbRoute } from '~~/types'
import { PostDetail } from '~~/types/response'

definePageMeta({
  layout: false
})

usePostHighlightTheme()
useCodeCopy()

const { $markdownRender } = useNuxtApp()
const route = useRoute()
const settings = useSettings()

const id = route.params.id

const { data, pending } = await useCustomFetch<PostDetail>(POSTS_DETAIL, {
  params: { id }
})

const post = computed(() => data.value.post)
const prev = computed(() => data.value.prev || null)
const next = computed(() => data.value.next || null)

const content = ref(post.value.content || '')
const toc = ref('')
const isMounted = ref(false)

// 引入模板
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: post.value.template
    }
  ]
})

const routes = computed<BreadcrumbRoute[]>(() => {
  const { category } = post.value

  return [
    {
      name: category.displayName,
      path: `/categories/${category.name}`,
      icon: 'category'
    },
    {
      name: '正文'
    }
  ]
})

useHead({
  title: `${post.value.seoTitle ? post.value.seoTitle : post.value.title} - ${settings.value.seoTitle}`,
  meta: [
    { name: 'keyword', content: `${post.value.seoKeywords ? post.value.seoKeywords + ',' : ''}${settings.value.seoKeywords}` },
    { name: 'description', content: `${post.value.seoDescription ? post.value.seoDescription + ',' : ''}${settings.value.seoDescription}` }
  ]
})

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
</script>

<style lang="scss">
@import '~~/assets/styles/post-content.scss';
</style>

<style lang="scss" scoped>
.posts-page {
  padding: .72rem 1.28rem;
  border-radius: .16rem;
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  .title {
    line-height: 1.4;
  }

  .content {
    margin-top: .36rem;
  }
}

.post-link-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: .36rem;
  border-top: 1px solid var(--border-color);
}

.post-toc-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  header {
    font-size: .24rem;
    font-weight: 700;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
  }

  .toc {
    margin-top: .24rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;

    ::v-deep(ol) {
      ol {
        margin: 0.5em 0 0 1em;
      }

      a {
        color: var(--primary-text);
        font-size: .16rem;
        word-break: break-all;

        &:hover {
          color: var(--brand-color);
        }
      }

      li {
        line-height: 1.4;

        &:not(:first-child) {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
