<template>
  <div
    ref="searchWrapperRef"
    class="search"
    :class="{ focus }"
  >
    <input
      ref="inputRef"
      v-model="keyword"
      name="keyword"
      class="keyword"
      type="text"
      placeholder="输入「关键字」查询"
      @blur="handleBlur"
      @keydown="handleInputKeyDown"
    />
    <button
      ref="btnRef"
      aria-label="button"
      class="btn"
      @click="handleClick"
    >
      <CommonIcon
        icon="search"
        :size="2"
      />
    </button>

    <section
      v-show="focus && keyword && historyKeywords.length > 0"
      ref="historyKeywordsRef"
      class="history-keywords"
    >
      <header class="header">
        <h4 class="title">
          历史搜索
        </h4>
        <button
          class="btn-clear"
          aria-label="button"
          @click="handleClearHistoryKeywords"
        >
          清空
        </button>
      </header>

      <div class="list">
        <a
          v-for="item of historyKeywords"
          :key="item"
          class="item"
          href="javascript:;"
          @click="handleHistoryItemClick(item)"
        >
          {{ item }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { HISTORY_KEYWORDS_KEY } from '~/config/constants'

const searchWrapperRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const btnRef = ref<HTMLButtonElement | null>(null)
const historyKeywordsRef = ref<HTMLElement | null>(null)

const route = useRoute()

const focus = ref(false)
const keyword = ref<string | undefined>(route.query.keyword as string)
const historyKeywords = ref<string[]>([])

const router = useRouter()

useClickOutside(searchWrapperRef, () => {
  if (focus.value) {
    focus.value = false
  }
})

router.beforeEach((to, from) => {
  if (from.path === '/search') {
    keyword.value = undefined
    focus.value = false
  }
  if (to.path === '/search') {
    setTimeout(() => {
      keyword.value = route.query.keyword as string
    })
  }
})

watch(focus, () => {
  if (focus.value) {
    setTimeout(() => {
      if (inputRef.value) {
        inputRef.value.focus()
      }
    })
  }
}, { immediate: true })

onMounted(() => {
  let value = []
  try {
    value = JSON.parse(localStorage.getItem(HISTORY_KEYWORDS_KEY) ?? '[]')
  } catch {
    value = []
  }

  historyKeywords.value = value
})

const handleClick = () => {
  focus.value = true
}

const handleBlur = (e: FocusEvent) => {
  const { relatedTarget } = e

  if (relatedTarget === btnRef.value) {
    handleSubmit()
    return
  }

  if (!historyKeywordsRef.value?.contains(relatedTarget as HTMLElement)) {
    focus.value = false
  }
}

const handleInputKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSubmit()
  }
}

const handleSubmit = () => {
  if (!keyword.value) {
    return
  }

  try {
    historyKeywords.value = [...new Set([keyword.value, ...historyKeywords.value])]
    localStorage.setItem(HISTORY_KEYWORDS_KEY, JSON.stringify(historyKeywords.value))
  } catch {
    // eslint-disable-line
  }

  router.push({
    path: '/search',
    query: {
      keyword: keyword.value
    }
  })
}

const handleHistoryItemClick = (value: string) => {
  keyword.value = value

  handleSubmit()
}

const handleClearHistoryKeywords = () => {
  historyKeywords.value = []
  try {
    localStorage.removeItem(HISTORY_KEYWORDS_KEY)
  } catch {
    // eslint-disable-line
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  gap: var(--gap-sm);
  position: sticky;
  top: 1.6rem;
  z-index: 1;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: .4rem;

  .keyword {
    display: none;
    border: 0;
    background-color: transparent;
    font-size: var(--font-size-sm);
    outline: none;
  }

  .btn {
    width: 3.2rem;
    height: 100%;
  }

  &.focus {
    width: 24rem;
    padding-left: var(--gap-sm);
    border: 1px solid var(--primary-color);

    @media screen and (max-width: 768px) {
      position: absolute;
      left: 1.6rem;
      width: calc(100% - 3.2rem);
      background-color: var(--bg);
    }

    .keyword {
      display: block;
      flex: 1;
    }

    .btn {
      margin-right: -1px;
      background-color: var(--btn-bg);
    }
  }

  .history-keywords {
    position: absolute;
    left: -1px;
    top: 100%;
    width: calc(100% + 2px);
    max-height: 300rem;
    margin-top: .2rem;
    border-radius: .4rem;
    border: 1px solid var(--border-color);
    background-color: var(--bg);
    overflow-y: auto;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--gap-sm) var(--gap);
      color: var(--secondary-text);
      font-size: var(--font-size-sm);
      border-bottom: 1px solid var(--border-color);

      .title {
        font-weight: normal;
      }

      .btn-clear {
        all: unset;
        color: var(--primary-color);
        cursor: pointer;
      }
    }

  .list {
    padding: var(--gap-sm) 0;

    .item {
      display: block;
      height: 3.2rem;
      padding: 0 var(--gap);
      line-height: 3.2rem;
      font-size: var(--font-size-sm);
      text-decoration: none;
      color: var(--secondary-text);

      &:hover {
        background-color: var(--btn-bg);
      }
    }
  }
  }
}
</style>
