<template>
  <div class="input-wrapper">
    <input
      ref="inputRef"
      v-model="keyword"
      class="input"
      type="text"
      name="keyword"
      placeholder="输入关键字，回车进行搜索"
      @keydown="handleKeydown"
    >
    <button
      type="submit"
      class="btn-submit"
      :disabled="loading"
      @click="$emit('search')"
    >
      <CommonIcon
        v-if="!loading"
        icon="search"
      />
      <CommonIcon
        v-else
        icon="loading"
        class="icon-loading"
      />
      搜索
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading?: boolean;
  keyword?: string;
}>()

const keyword = ref(props.keyword)
const inputRef = ref<HTMLInputElement>()
const router = useRouter()

onMounted(() => {
  inputRef.value.focus()
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !props.loading) {
    router.push({
      path: '/search',
      query: {
        keyword: keyword.value
      }
    })
  }
}
</script>
