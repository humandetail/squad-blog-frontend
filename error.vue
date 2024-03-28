<template>
  <div class="page-not-found">
    <h2>{{ error.statusCode }}</h2>
    <div class="reason">
      {{ error.message }}
    </div>
    <button
      class="btn-back"
      aria-label="button"
      @click="handleError"
    >
      返回首页
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: any
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="scss" scoped>
.page-not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8vh;
  width: 100vw;
  height: 100vh;

  h2 {
    font-size: 8vw;
    color: var(--red);
  }

  .reason {
    font-size: 4vw;
  }

  .btn-back {
    width: 80vw;
    height: 10vh;
    font-size: 2vw;
    color: var(--white);
    border: 0;
    border-radius: 1vw;
    background-color: var(--primary-color);
    cursor: pointer;

    &:hover {
      opacity: .9;
    }
  }
}
</style>
