<template>
  <div
    v-if="loading"
    class="loading"
  >
    <div class="loader" />
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
  margin: var(--gap) auto;
  font-size: 2em;
  color: var(--primary-color);
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

  .text {
    font-size: .6em;
    background-image: linear-gradient(to right, var(--red), var(--blue), var(--green));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: 1s textSpin linear infinite;
  }
}

@keyframes spin {
  0%,
  100% {
    box-shadow: 0.2em 0px 0 0px var(--primary-color);
  }
  12% {
    box-shadow: 0.2em 0.2em 0 0 var(--red);
  }
  25% {
    box-shadow: 0 0.2em 0 0 var(--green);
  }
  37% {
    box-shadow: -0.2em 0.2em 0 0 var(--red);
  }
  50% {
    box-shadow: -0.2em 0 0 0 var(--primary-color);
  }
  62% {
    box-shadow: -0.2em -0.2em 0 0 var(--red);
  }
  75% {
    box-shadow: 0px -0.2em 0 0 var(--green-color);
  }
  87% {
    box-shadow: 0.2em -0.2em 0 0 var(--red);
  }
}

@keyframes textSpin {
  0%, 75% {
    background-image: linear-gradient(to right, var(--red), var(--blue), var(--green));
  }
  25%, 100% {
    background-image: linear-gradient(to right, var(--green), var(--red), var(--blue));
  }
  50% {
    background-image: linear-gradient(to right, var(--blue), var(--green), var(--red));
  }
}
</style>
