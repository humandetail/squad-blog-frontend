<template>
  <div class="page-not-found">
    <h1 class="title">
      404
    </h1>

    <h2 class="sub-title">
      PAGE NOT FOUND.
    </h2>

    <div class="content">
      <nuxt-link to="/search">
        返回页面
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'plain',
  key: '404'
})

useHead({
  title: 'PAGE NOT FOUND'
})
</script>

<style lang="scss" scoped>
.page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap32);
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);

  .title {
    font-size: 40px;
    color: var(--danger-color);
  }

  .sub-title {
    font-size: 32px;
    color: var(--danger-color);
  }
}
</style>
