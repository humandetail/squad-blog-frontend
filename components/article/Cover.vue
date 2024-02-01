<template>
  <figure
    class="cover"
    @click="handleClick"
  >
    <img
      class="cover-img"
      :src="cover.src"
      :alt="cover.alt ?? '封面图'"
    />
  </figure>
</template>

<script setup lang="ts">
import type { ArticleCover } from '~/types'

const props = defineProps<{
  cover: ArticleCover
}>()

const router = useRouter()

const handleClick = () => {
  router.push(props.cover.route)
}
</script>

<style lang="scss" scoped>
.cover {
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;

  .cover-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
}
</style>
