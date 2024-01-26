<template>
  <button
    class="btn btn-menu"
    :class="{
      active: menuBtnActive
    }"
    @click="handleMenuBtnClick"
  >
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
  </button>
</template>

<script setup lang="ts">

const menuBtnActive = inject('menuBtnActive', ref(false))

const handleMenuBtnClick = () => {
  menuBtnActive.value = !menuBtnActive.value
}
</script>

<style lang="scss" scoped>
.btn-menu {
  display: none !important;
  position: relative;

  @media screen and (max-width: 768px) {
    display: block !important;
  }

  .line {
    position: absolute;
    left: .6rem;
    top: 1.5rem;
    width: 2rem;
    height: .2rem;
    border-radius: .1rem;
    background-color: var(--secondary-text);
    transform-origin: left top;
    transition: all .1s linear;
    pointer-events: none;

    &:nth-child(1) {
      transform: translate(0, -0.75rem);
    }

    &:nth-child(2) {
      transform: translate(0, 0);
    }

    &:nth-child(3) {
      transform: translate(0, 0.75rem);
    }
  }

  &:active {
    .line {
      &:nth-child(1) {
        transform: translate(0, -0.75rem) rotate(18deg);
      }

      &:nth-child(2) {
        width: 1.2rem;
      }

      &:nth-child(3) {
        transform: translate(0, 0.75rem) rotate(-18deg);
      }
    }
  }

  &.active {
    .line {
      transform-origin: center center;

      &:nth-child(1) {
        transform: rotate(45deg);
      }

      &:nth-child(2) {
        width: 0;
      }

      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
