<script setup lang="ts">
defineProps<{
  error: any
}>()
watchEffect(() => {
  clearError({ redirect: '/404' })
})
</script>
