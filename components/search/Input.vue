<template>
  <div class="input-wrapper">
    <input
      ref="inputRef"
      :value="keyword"
      class="input"
      type="text"
      name="keyword"
      placeholder="输入关键字，回车进行搜索"
      @keydown="handleKeydown"
      @input="handleInput"
    >
    <button
      type="submit"
      class="btn-submit"
      :disabled="loading"
      @click="$emit('search')"
    >
      <span v-if="loading" class="iconfont icon-loading" />
      搜索
    </button>
  </div>
</template>

<script setup lang="ts">
import { useFocus } from '@vueuse/core'

const props = defineProps<{
  loading?: boolean;
  keyword?: string;
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:keyword', value: string);
  (e: 'search')
}>()

const inputRef = ref<HTMLInputElement>()
const { focused } = useFocus(inputRef)

onMounted(() => {
  focused.value = true
})

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !props.loading) {
    emit('search')
  }
}

const handleInput = (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  emit('update:keyword', target.value)
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  align-items: center;

  .input {
    flex: 1;
    height: .48rem;
    padding: 0 .16rem;
    font-size: .16rem;
    color: var(--primary-text);
    border: 4px solid var(--brand-color);
    border-top-left-radius: .08rem;
    border-bottom-left-radius: .08rem;
  }

  .btn-submit {
    width: 1.2rem;
    height: .48rem;
    font-size: .2rem;
    color: #fff;
    border: 0;
    border-top-right-radius: .08rem;
    border-bottom-right-radius: .08rem;
    background-color: var(--brand-color);
    cursor: pointer;

    .icon-loading {
      display: inline-block;
      animation: spinning 1.5s linear infinite;
    }
  }
}

@keyframes spinning {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
