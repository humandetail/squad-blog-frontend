<template>
  <div
    v-if="loading"
    class="common-loading"
  >
    <div class="image">
      <div class="loader" />
    </div>
  </div>

  <slot v-else />
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<style lang="scss" scoped>
.common-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--gap16);
  margin: 0 auto;
  font-size: 70px;
  color: var(--brand-color);
  .loader {
    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
    vertical-align: middle;
    pointer-events: none;
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      border-radius: 50%;
      animation: 1s spin linear infinite;
    }
    &::before {
      transform: rotateX(70deg);
    }
    &::after {
      transform: rotateY(70deg);
      animation-delay: 0.4s;
    }
  }
}
@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}
@keyframes rotateccw {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
@keyframes spin {
  0%,
  100% {
    box-shadow: 0.2em 0px 0 0px var(--brand-color);
  }
  12% {
    box-shadow: 0.2em 0.2em 0 0 var(--secondary-color);
  }
  25% {
    box-shadow: 0 0.2em 0 0px var(--secondary-color);
  }
  37% {
    box-shadow: -0.2em 0.2em 0 0 var(--brand-color);
  }
  50% {
    box-shadow: -0.2em 0 0 0 var(--brand-color);
  }
  62% {
    box-shadow: -0.2em -0.2em 0 0 var(--secondary-color);
  }
  75% {
    box-shadow: 0px -0.2em 0 0 var(--brand-color);
  }
  87% {
    box-shadow: 0.2em -0.2em 0 0 var(--brand-color);
  }
}
</style>
