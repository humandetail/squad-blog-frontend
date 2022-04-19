<template>
  <div class="home-page">
    <HomeBanner />
    <HomeNew />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: 'index',
  pageTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__rollIn',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  },
  layoutTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__zoomInUp',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  }
})
</script>
