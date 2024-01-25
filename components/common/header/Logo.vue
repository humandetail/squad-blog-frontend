<template>
  <nuxt-link
    to="/"
    class="logo"
  >
    <img
      class="site-logo"
      :src="settings?.logoPic"
      alt="细节个人博客"
    />
    <div class="site-name">
      {{ settings?.siteName }}
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
const settings = useSettings()
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  gap: .8rem;
  height: 3.2rem;
  text-decoration: none;

  .site-logo {
    width: 3.2rem;
    height: 3.2rem;
  }

  .site-name {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--primary-text);
  }
}
</style>
