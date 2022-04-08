<template>
  <div class="posts-layout">
    <div
      class="posts-layout-main"
      :class="{ 'menu-visible': menuVisible }"
    >
      <LayoutHeader>
        <button
          class="btn-toggle-menu"
          @click="menuVisible = !menuVisible"
        >
          <span
            class="iconfont"
            :class="`icon-${menuVisible ? 'unexpanded' : 'expanded'}`"
          />
        </button>
      </LayoutHeader>

      <main>
        <LayoutContainer>
          <slot />
        </LayoutContainer>
      </main>

      <LayoutFooter />
    </div>

    <div class="posts-layout-toc" :class="{ visible: menuVisible }">
      <slot name="toc" />
    </div>
  </div>
</template>

<script setup lang="ts">
const menuVisible = ref(false)
</script>

<style lang="scss" scoped>
.posts-layout {
  display: flex;

  .posts-layout-main {
    position: relative;
    width: 100%;
    transition: width .2s linear;

    &.menu-visible {
      width: calc(100% - 3.2rem);

      @media screen and (min-width: 1281px) {
        ::v-deep(.container) {
          padding: 0 .24rem;
        }
      }
    }
  }

  .posts-layout-toc {
    position: fixed;
    right: 0;
    top: 0;
    width: 0;
    height: 100vh;
    padding: .48rem 0;
    background-color: var(--plain-color);
    box-shadow: var(--box-shadow);
    transition: width .2s linear;

    &.visible {
      width: 3.2rem;
      padding: .48rem .24rem;
    }
  }

  .btn-toggle-menu {
    margin-left: .24rem;
    border: 0;
    color: var(--secondary-text);
    background-color: transparent;
    cursor: pointer;

    .iconfont {
      font-size: .24rem;
    }
  }
}
</style>
