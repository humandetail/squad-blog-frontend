<template>
  <section class="search-wrapper">
    <CommonIcon icon="search" />
    <input
      class="keyword-input"
      type="text"
      placeholder="请输入关键字"
      @keydown="handleKeydown"
    >
  </section>
</template>

<script setup lang="ts">
const router = useRouter()

const handleKeydown = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement
  const value = target.value.trim()

  if (e.key === 'Enter') {
    router.push({
      path: '/search',
      query: {
        keyword: value
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  height: 44px;
  margin-bottom: var(--gap24);
  border-radius: 8px;
  box-shadow: -2px -2px 4px var(--shadow-color-light) inset, 2px 2px 4px var(--shadow-color-dark) inset;

  .icon-search {
    position: absolute;
    left: 8px;
    top: 50%;
    font-size: 18px;
    color: var(--gray-text);
    transform: translateY(-50%);
  }

  .keyword-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 6px 16px 6px 32px;
    font-size: 16px;
    color: var(--primary-text);
    border: 0;
    background-color: transparent;
  }
}
</style>
