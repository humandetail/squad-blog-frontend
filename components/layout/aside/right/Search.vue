<template>
  <section class="search-wrapper">
    <CommonIcon icon="search" />
    <input
      type="text"
      @keydown="handleKeydown"
    >
  </section>
</template>

<script setup lang="ts">
const router = useRouter()

const handleKeydown = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement
  const value = target.value.trim()

  if (e.key === 'Enter') {
    router.push({
      path: '/search',
      query: {
        keyword: value
      }
    })
  }
}
</script>
