<template>
  <component
    :is="postLink ? NuxtLink : 'span'"
    :to="link"
    class="post-link"
    :class="{ 'is-link': postLink }"
  >
    <CommonIcon
      :icon="isPrev ? 'arrow-left' : 'arrow-right'"
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

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.post-link {
  display: flex;
  align-items: center;
  gap: var(--gap8);
  min-width: 0;
  color: var(--primary-text);

  .icon {
    width: 20px;
    height: 20px;
  }

  .title {
    flex: 1;
    @include ellipsis;
  }

  &:last-child {
    text-align: right;
  }
}
</style>
