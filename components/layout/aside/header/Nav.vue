<template>
  <nav class="nav">
    <CommonIcon
      class="nav-icon"
      icon="menu"
    />

    <ul class="nav-list">
      <li
        v-for="item of navs"
        :key="item.name"
        class="nav-item"
      >
        <nuxt-link
          :to="item.name"
          class="nav-item-link"
        >
          {{ item.displayName }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { getCategories } from '~~/config/api'

const { data } = await getCategories()

const navs = computed(() => {
  return [
    {
      name: '/',
      displayName: '首页'
    },
    ...(data.value.records || []).map(item => ({
      name: `/categories/${item.name}`,
      displayName: item.displayName
    })),
    {
      name: '/about',
      displayName: '关于我们'
    }
  ]
})
</script>

<style lang="scss" scoped>
.nav {
  position: relative;

  @media screen and (max-width: 960px) {
    justify-self: end;
    margin-left: auto;

    &:hover {
      .nav-list {
        display: block;
      }
    }
  }

  .nav-icon {
    display: none;

    @media screen and (max-width: 960px) {
      display: block;
      font-size: 24px;
    }
  }
}

.nav-list {
  .nav-item {
    margin: 16px 0;
    height: 48px;
    border-radius: 8px;
    border: 1px solid var(--shadow-color-dark);
    background-image: linear-gradient(to bottom, var(--shadow-color-light), var(--shadow-color-dark));
    overflow: hidden;

    @media screen and (max-width: 1440px) {
      margin: 0;
      height: 36px;
      border-radius: 0;
      border: 0;
      background-image: unset;
    }

    .nav-item-link {
      position: relative;
      display: block;
      margin: 0 32px 0 0;
      padding: 8px 12px;
      line-height: 30px;
      text-align: center;
      color: var(--primary-text);
      border-radius: 8px;
      background-color: var(--background-color);
      background-image: linear-gradient(to left, var(--shadow-color-radio-drak), var(--shadow-color-light));
      box-shadow: 1px 0 1px var(--shadow-color-dark);

      @media screen and (max-width: 1440px) {
        margin: 0;
        padding: 0 0 0 var(--gap32);
        border-radius: 0;
        background-color: unset;
        background-image: unset;
        box-shadow: unset;
        line-height: 36px;
      }

      &:focus,
      &:hover {
        text-decoration: none;
      }

      &:hover {
        @media screen and (max-width: 1440px) {
          text-decoration: underline;
        }

        &::before {
          box-shadow: -1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-dark);
        }

        &::after {
          box-shadow: -1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-dark);
        }
      }

      &.router-link-active {
        margin: 0 0 0 32px;
        background-image: linear-gradient(to right, var(--shadow-color-radio-drak), var(--shadow-color-light));
        box-shadow: -1px 0 1px var(--shadow-color-dark);

        @media screen and (max-width: 1440px) {
          margin: 0;
          background-image: unset;
          box-shadow: unset;
        }
      }

      &::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 50%;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-shadow: -1px -1px 1px var(--shadow-color-light) inset, 1px 1px 1px var(--shadow-color-dark) inset;
        transform: translateY(-50%);
      }

      &::after {
        content: '';
        position: absolute;
        right: 10px;
        top: 50%;
        width: 24px;
        height: 6px;
        border-radius: 3px;
        box-shadow: -1px -1px 1px var(--shadow-color-light) inset, 1px 1px 1px var(--shadow-color-dark) inset;
        transform: translateY(-50%);

        @media screen and (max-width: 1440px) {
          content: none;
        }
      }

      &.router-link-active {
        &::before {
          box-shadow: -1px -1px 1px var(--shadow-color-light) inset, 1px 1px 1px var(--shadow-color-dark) inset;

          @media screen and (max-width: 1440px) {
            box-shadow: -1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-dark);
          }
        }

        &::after {
          background-color: var(--danger-color);

          @media screen and (max-width: 1440px) {
            content: '';
            right: auto;
            left: 14px;
            top: 50%;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            box-shadow: unset;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  @media screen and (max-width: 1440px) {
    display: flex;
    align-items: center;
    gap: var(--gap8);
  }

  @media screen and (max-width: 960px) {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 9;
    padding: var(--gap8) var(--gap32) var(--gap8) var(--gap16);
    border-radius: 8px;
    border: 1px solid var(--shadow-color-dark);
    background-color: var(--background-color);
    white-space: nowrap;
  }
}
</style>
