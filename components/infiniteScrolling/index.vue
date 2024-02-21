<template>
  <div class="infinite-scrolling">
    <div class="infinite-scrolling-container">
      <slot />
    </div>

    <div
      ref="detectorRef"
      class="detector"
      :style="{ bottom: offset }"
    ></div>

    <CommonLoading
      :loading="!noMore && loading"
    >
      玩命加载中 ...
    </CommonLoading>
    <InfiniteScrollingNoMore v-if="noMoreBtnVisible" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  loading?: boolean
  noMore?: boolean
  offset?: string
}>(), {
  loading: false,
  noMore: false,
  offset: '100px'
})

const emits = defineEmits<(e: 'reach-bottom') => void>()

const detectorRef = ref<HTMLElement | null>(null)
const noMoreBtnVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (detectorRef.value) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !props.loading) {
        if (!props.noMore) {
          emits('reach-bottom')
        } else {
          noMoreBtnVisible.value = true

          setTimeout(() => {
            noMoreBtnVisible.value = false
          }, 2000)
        }
      }
    })

    observer.observe(detectorRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})

emits('reach-bottom')
</script>

<style lang="scss" scoped>
.infinite-scrolling {
  position: relative;
  min-height: 100%;

  .detector {
    position: absolute;
    left: 0;
  }
}
</style>
