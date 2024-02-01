<template>
  <nav
    class="nav"
    :class="{
      active: menuBtnActive
    }"
  >
    <ul class="nav-list">
      <li class="item">
        <router-link to="/">
          首页
        </router-link>
      </li>
      <li
        v-for="item of categories"
        :key="item.id"
        class="item"
      >
        <router-link
          :to="`/categories/${item.name}`"
        >
          {{ item.displayName }}
        </router-link>
      </li>
      <li class="item">
        <router-link to="/about">
          关于
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { getCategories } from '~/config/api'

const menuBtnActive = inject('menuBtnActive', ref(false))

const { data } = await getCategories()

const categories = computed(() => {
  return data.value?.records ?? []
})
</script>

<style lang="scss" scoped>
.nav-list {
  display: flex;
  align-items: center;
  gap: var(--gap);

  .item a {
    font-weight: 700;
    text-decoration: none;
    color: var(--primary-text);
    font-size: var(--font-size);

    &.router-link-exact-active,
    &:hover {
      color: var(--primary-color);
    }
  }
}

@media screen and (max-width: 768px) {
  .nav {
    display: none;
    position: fixed;
    inset: 0;
    z-index: -1;
    padding: 8rem var(--gap) var(--gap);
    background-color: var(--bg);

    &.active {
      display: block;
    }

    .nav-list {
      flex-direction: column;
      justify-content: center;
      background-color: var(--bg);

      .item {
        width: 100%;
        a {
          display: block;
          text-align: center;
          line-height: 3.2rem;
          border-radius: .4rem;

          &.router-link-exact-active {
            background-color: var(--primary-color);
            color: var(--white);
          }
        }
      }
    }
  }
}
</style>
