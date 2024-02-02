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

const visible = ref(false)
const btnRef = ref<HTMLButtonElement | null>(null)

useClickOutside(btnRef, () => {
  if (visible.value) {
    const oTOC = document.querySelector<HTMLElement>('.toc-wrapper')
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

  const oTOC = document.querySelector<HTMLElement>('.toc-wrapper')

  if (oTOC) {
    oTOC.style.display = visible.value ? 'block' : 'none'
  }
}

const handleResize = debounce((e) => {
  console.log(e)
  if (window.innerWidth <= 768) {
    visible.value = false
  } else {
    visible.value = true
  }
  const oTOC = document.querySelector<HTMLElement>('.toc-wrapper')
  if (oTOC) {
    oTOC.style.display = visible.value ? 'block' : 'none'
  }
}, 16)
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
