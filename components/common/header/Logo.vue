<template>
  <nuxt-link
    to="/"
    class="logo"
  >
    <img
      class="site-logo"
      :src="settings?.logoPic"
      alt="logo"
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
    transition: all .1s ease-in;
  }

  &:hover {
    .site-name {
      text-shadow: 1px 1px 1px var(--bg), 0 0 .5em var(--primary-text), 0 0 .2em var(--primary-text);
    }
  }
}
</style>
