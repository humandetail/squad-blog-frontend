<template>
  <component
    :is="postLink ? NuxtLink : 'span'"
    :to="link"
    class="post-link"
    :class="{ 'is-link': postLink }"
  >
    <span
      class="iconfont"
      :class="`icon-${isPrev ? 'arrow-left' : 'arrow-right'}`"
      :style="{ order: isPrev ? 1 : 2 }"
    />
    <span
      class="title"
      :style="{ order: isPrev ? 2 : 1}"
    >
      {{ postLink ? postLink.title : '没有了' }}
    </span>
  </component>
</template>

<script setup lang="ts">

import { PostLinkType } from '~~/types/response'

const props = withDefaults(defineProps<{
  postLink: PostLinkType | null,
  isPrev?: boolean
}>(), {
  isPrev: false
})

const NuxtLink = resolveComponent('nuxt-link')

const link = computed(() => props.postLink ? `/posts/${props.postLink.id}` : undefined)
</script>
