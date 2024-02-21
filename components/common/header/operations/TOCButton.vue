<template>
  <button
    ref="btnRef"
    class="btn btn-toc"
    :class="{
      visible
    }"
    aria-label="button"
    @click="handleClick"
  >
    目录
  </button>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'

const TOC_CONTAINER = '.toc-container'

const visible = ref(false)
const btnRef = ref<HTMLButtonElement | null>(null)

useClickOutside(btnRef, () => {
  if (visible.value && (btnRef.value?.getBoundingClientRect()?.width ?? 0) > 0) {
    const oTOC = document.querySelector<HTMLElement>(TOC_CONTAINER)
    visible.value = false
    if (oTOC) {
      oTOC.style.display = visible.value ? 'block' : 'none'
    }
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

const handleClick = () => {
  visible.value = !visible.value

  const oTOC = document.querySelector<HTMLElement>(TOC_CONTAINER)

  if (oTOC) {
    oTOC.style.display = visible.value ? 'block' : 'none'
  }
}

const handleResize = debounce(() => {
  visible.value = window.innerWidth > 768
  const oTOC = document.querySelector<HTMLElement>(TOC_CONTAINER)
  if (oTOC) {
    oTOC.style.display = visible.value ? 'block' : 'none'
  }
}, 8)
</script>

<style lang="scss" scoped>
.btn-toc {
  display: none !important;

  @media (max-width: 768px) {
    display: flex !important;
  }

  &.visible {
    color: var(--primary-color);
  }
}
</style>
