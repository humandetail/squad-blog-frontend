<template>
  <div class="site-wrapper">
    <nuxt-link to="/">
      <img
        class="site-logo"
        :src="settings.logoPic"
        alt="Logo"
      >
      <span class="site-name">
        {{ settings.siteName }}
      </span>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const settings = useSettings()
</script>

<style lang="scss" scoped>
.site-wrapper {
  padding: .08rem 0;

  a {
    display: flex;
    align-items: center;
    height: .48rem;
    text-decoration: none;
    color: var(--primary-text);

    .site-logo {
      width: .48rem;
      height: .48rem;
    }

    .site-name {
      margin-left: .08rem;
      font-weight: 700;
      font-size: .24rem;
    }
  }
}
</style>
