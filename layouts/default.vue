<template>
  <div class="page-container">
    <CommonHeader />
    <div class="container">
      <main class="page-main">
        <NuxtPage />
      </main>
      <CommonAside />
    </div>
    <CommonFooter />

    <button
      ref="btnRef"
      class="btn-to-top"
      @click="gotoTop"
    >
      <CommonIcon
        icon="backtop"
        :size="2"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'

const btnRef = ref<HTMLElement | null>(null)

const handleScroll = debounce(() => {
  if (btnRef.value) {
    btnRef.value.classList[document.documentElement.scrollTop > 100 ? 'add' : 'remove']('visible')
  }
}, 16)

const gotoTop = () => {
  document.documentElement.scroll(0, 0)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: var(--container-width);
  margin: 0 auto;
  min-height: calc(100vh - var(--header-height));

  .page-main {
    flex: 1;
    padding: var(--gap);
    min-width: 0;
  }
}

.btn-to-top {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  z-index: 999;
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;
  color: var(--secondary-text);
  border: 0;
  border-radius: .2rem;
  background-color: var(--btn-bg);
  opacity: 0;
  visibility: hidden;
  transition: all .3s ease-in;
  cursor: pointer;

  &:hover {
    :deep(.icon) {
      display: none;
    }

    &::before {
      content: '返回顶部';
      display: inline-flex;
      width: 100%;
      height: 100%;
      transform: scale(.75);
    }
  }

  &.visible {
    bottom: 2rem;
    opacity: 1;
    visibility: visible;
  }
}
</style>
