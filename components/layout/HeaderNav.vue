<template>
  <nav class="nav">
    <ul class="list">
      <li class="item">
        <nuxt-link to="/">
          首页
        </nuxt-link>
      </li>
      <li
        class="item dropdown"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <span>
          分类
        </span>
      </li>
      <li
        class="item dropdown"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <span>
          标签
        </span>
      </li>
      <li class="item">
        <nuxt-link to="/about">
          关于
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const headerDropdown = useHeaderDropdown()

const handleMouseEnter = () => {
  headerDropdown.value = true
}

const handleMouseLeave = () => {
  headerDropdown.value = false
}
</script>

<style lang="scss" scoped>
.nav {
  margin-left: .48rem;
}

.list {
  display: flex;
  align-items: center ;

  .item {
    padding: 0 .16rem;

    a,
    span {
      display: inline-block;
      font-weight: 700;
      line-height: .64rem;
      color: var(--primary-text);
    }

    .router-link-exact-active {
      color: var(--brand-color);
    }
  }
}
</style>
