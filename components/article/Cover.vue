<template>
  <figure
    ref="figureRef"
    class="cover"
    @click="handleClick"
  >
    <img
      class="cover-img"
      :src="EmptyImage"
      :data-src="cover.src"
      :alt="cover.alt ?? '封面图'"
    />
  </figure>
</template>

<script setup lang="ts">
import type { ArticleCover } from '~/types'
import EmptyImage from '~/assets/empty.svg'

const props = defineProps<{
  cover: ArticleCover
}>()

const router = useRouter()

const figureRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (figureRef.value) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const oImg = figureRef.value!.querySelector('.cover-img')
          if (!oImg || oImg.classList.contains('loaded')) {
            return
          }
          oImg.classList.add('loaded')
          oImg.setAttribute('src', oImg.getAttribute('data-src') ?? '')
          oImg.setAttribute('data-src', '')
        }
      })
    })

    observer.observe(figureRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect?.()
})

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
