<template>
  <div class="page-not-found">
    <h2>{{ error.statusCode }}</h2>
    <button
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
