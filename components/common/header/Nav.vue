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
      <li class="item">
        <router-link to="/categories/1">
          前端
        </router-link>
      </li>
      <li class="item">
        <router-link to="/categories/2">
          后端
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
const menuBtnActive = inject('menuBtnActive', ref(false))
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
