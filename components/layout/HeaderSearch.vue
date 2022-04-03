<template>
  <div
    class="falsy-search"
    @click="handleClick"
  >
    <span class="placeholder">
      请输入关键字搜索文章
    </span>
    <span class="iconfont icon-search" />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const handleClick = () => {
  router.push('/search')
}
</script>

<style lang="scss" scoped>
.falsy-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 3.2rem;
  height: .48rem;
  padding: 0 .16rem;
  border: 1px solid var(--border-color);
  border-radius: .24rem;
  text-decoration: none;
  cursor: pointer;

  .placeholder {
    font-size: .16rem;
    color: var(--placeholder-color);
  }

  .icon-search {
    font-size: .2rem;
    color: var(--border-color)
  }
}
</style>
