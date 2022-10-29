<template>
  <div class="site-wrapper">
    <div class="site-logo">
      <nuxt-link
        to="/"
        class="site-link"
      >
        <img
          :src="settings.logoPic"
          :alt="settings.siteName"
        >
      </nuxt-link>

      <div class="theme-control-wrapper">
        <div class="theme-control">
          <CommonIcon
            :icon="`theme-${mode}`"
            class="icon-theme"
            @click="handleSwitchMode"
          />
        </div>
      </div>
    </div>

    <div class="site-name">
      <nuxt-link
        to="/"
        class="site-link"
      >
        {{ settings.siteName }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const settings = useSettings()
const mode = useThemeMode()

const handleSwitchMode = () => {
  mode.value = mode.value === 'dark'
    ? 'light'
    : 'dark'
}
</script>

<style lang="scss" scoped>
.site-wrapper {
  padding: var(--gap32);

  @media screen and (max-width: 1440px) {
    display: flex;
    align-items: center;
    gap: var(--gap16);
    padding: 0;
  }

  .site-logo {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: -4px -4px 8px var(--shadow-color-light), 4px 4px 8px var(--shadow-color-dark);

    @media screen and (max-width: 1440px) {
      position: static;
      width: 40px;
      height: 40px;
    }

    .site-link {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      padding: var(--gap16);
      border-radius: 50%;
      background-color: var(--background-color);

      @media screen and (max-width: 1440px) {
        position: static;
        width: 40px;
        height: 40px;
        padding: var(--gap8);
      }
    }

    .theme-control-wrapper {
      width: 100%;
      height: 100%;
      transform-origin: center center;
      transform: rotate(100deg);

      @media screen and (max-width: 1440px) {
        position: absolute;
        right: var(--gap16);
        top: 50%;
        width: 24px;
        height: 24px;
        transform: translateY(-50%);
      }

      .theme-control {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: var(--shadow-color-drak);
        cursor: pointer;
        transform: rotate(-100deg);
        box-shadow: -2px -2px 4px var(--shadow-color-light), 2px 2px 4px var(--shadow-color-dark);

        @media screen and (max-width: 1440px) {
          transform: unset;
          background-color: unset;
          box-shadow: unset;
        }

        .icon-theme {
          font-size: 16px;
          display: block;
        }
      }
    }
  }

  .site-name {
    margin-top: 16px;
    font-size: 28px;
    text-align: center;

    @media screen and (max-width: 1440px) {
      margin-top: 0;
      font-size: 20px;
    }

    @media screen and (max-width: 640px) {
      font-size: 14px;
    }

    .site-link {
      color: var(--primary-text);

      &:focus,
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
