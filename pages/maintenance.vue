<template>
  <div class="website-maintenance">
    网站维护中，请稍候再访问
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '维护中',
  layout: false
})
</script>

<style lang="scss" scoped>
.website-maintenance {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .32rem;
}
</style>
