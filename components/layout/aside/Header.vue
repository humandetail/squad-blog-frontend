<template>
  <header class="aside-header">
    <h2 class="title">
      <span class="iconfont" :class="`icon-${icon}`" />
      {{ title }}
    </h2>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>()
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  line-height: .48rem;
  font-size: .2rem;

  .iconfont {
    margin-right: .08rem;
    font-size: .28rem;
  }
}
</style>
