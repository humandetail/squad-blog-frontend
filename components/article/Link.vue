<template>
  <NuxtLink
    :custom="!link"
    :to="path"
    :title="link?.title"
  >
    <div
      class="link"
      :class="isNext ? 'next-link' : 'prev-link'"
    >
      <CommonIcon
        :icon="isNext ? 'arrow-right' : 'arrow-left'"
        :size="1.6"
      />
      <span class="value ellipsis">{{ link?.title ?? '没有了' }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PostDetail } from '~/types/response'

const props = defineProps<{
  isNext?: boolean
  link: null | PostDetail['prev']
}>()

const path = computed(() => {
  return props.link
    ? `/posts/${props.link.id}`
    : undefined
})
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  gap: .8rem;

  &.next-link {
    :deep(.icon) {
      order: 2
    }

    .value {
      order: 1;
      text-align: right;
    }

    @media (max-width: 768px) {
      :deep(.icon) {
        order: 1
      }

      .value {
        order: 2;
        text-align: left;
      }
    }
  }

  .value {
    flex: 1;
    min-width: 0;
  }
}
</style>
