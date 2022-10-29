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
      @click="handleSearch"
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
    handleSearch()
  }
}

const handleSearch = () => {
  router.push({
    path: '/search',
    query: {
      keyword: keyword.value
    }
  })
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  border-radius: 8px;
  height: 48px;
  box-shadow: -2px -2px 4px var(--shadow-color-light) inset, 2px 2px 4px var(--shadow-color-dark) inset;

  .input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 var(--gap16);
    color: var(--primary-text);
    font-size: 16px;
    border: 0;
    background-color: transparent;
  }

  .btn-submit {
    white-space: nowrap;
    height: 36px;
    margin: 6px;
    padding: 0 var(--gap16);
    color: var(--primary-text);
    font-size: 16px;
    border: 0;
    border-radius: 8px;
    background-color: transparent;
    cursor: pointer;
    box-shadow: -2px -2px 4px var(--shadow-color-light), 2px 2px 4px var(--shadow-color-dark);

    .icon {
      vertical-align: -3px;
      font-size: 18px;
    }

    &:active {
      box-shadow: -2px -2px 4px var(--shadow-color-light) inset, 2px 2px 4px var(--shadow-color-dark) inset;
    }
  }
}
</style>
