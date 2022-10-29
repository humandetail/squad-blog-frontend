<template>
  <section class="blogrolls">
    <header class="header">
      <h3 class="title">
        <CommonIcon icon="link" />
        <span>
          友情链接
        </span>
      </h3>
    </header>

    <ul class="list">
      <li
        v-for="item of blogrolls"
        :key="item.id"
        class="item"
      >
        <a
          class="item-link"
          :href="item.link"
          target="_blank"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { getBlogrolls } from '~~/config/api'

const { data } = await getBlogrolls()

const blogrolls = computed(() => (data.value.records || []).map(({ id, name, link }) => ({
  id,
  name,
  link
})))
</script>

<style lang="scss" scoped>
.blogrolls {
  margin-top: 32px;

  @media screen and (max-width: 1440px) {
    position: relative;
    margin-top: 0;
    margin-left: auto;

    &:hover .list {
      display: block;
    }
  }

  @media screen and (max-width: 960px) {
    margin-left: 0;
  }

  .title {
    color: var(--secondary-text);

    @media screen and (max-width: 1440px) {
      font-size: 16px;
    }

    @media screen and (max-width: 960px) {
      & > span {
        display: none;
      }
    }

    .icon {
      @media screen and (max-width: 1440px) {
        vertical-align: -1px;
      }

      @media screen and (max-width: 960px) {
        display: block;
        font-size: 24px;
      }
    }
  }

  .list {
    @media screen and (max-width: 1440px) {
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

    .item-link {
      display: block;
      position: relative;
      margin-top: 8px;
      padding-left: 24px;
      color: var(--secondary-text);

      &::before {
        content: '';
        position: absolute;
        left: 4px;
        top: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transform: translateY(-50%);
        box-shadow: -1px -1px 2px var(--shadow-color-light) inset, 1px 1px 2px var(--shadow-color-dark) inset;
      }

      &:hover::before {
        box-shadow: -1px -1px 2px var(--shadow-color-light), 1px 1px 2px var(--shadow-color-dark);
      }
    }
  }
}
</style>
