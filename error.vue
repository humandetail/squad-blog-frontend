<template>
  <div class="page-not-found">
    404 Page Not Found
    {{ error.data }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: any
}>()
</script>
