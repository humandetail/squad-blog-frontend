<template>
  <InfiniteScrolling
    :loading="loading"
    :no-more="noMore"
    @reach-bottom="request({ keyword })"
  >
    <div
      class="search"
    >
      <Breadcrumbs :breadcrumbs="breadcrumbs" />

      <div
        v-if="!loading"
        class="tips"
      >
        <template v-if="pagination.total > 0">
          为您找到
          <span class="total">
            {{ pagination.total }}
            个
          </span>
          与「
          <span class="keyword">
            {{ keyword }}
          </span>
          」相关的内容。
        </template>

        <template v-else>
          抱歉没有找到与「
          <span class="keyword">
            {{ keyword }}
          </span>
          」相关的内容。
        </template>
      </div>

      <dl
        v-if="!loading && pagination.total === 0"
        class="suggestion"
      >
        <dt class="title">
          温馨提示：
        </dt>
        <dd class="content">
          <ul class="list">
            <li class="item">
              请检查您的输入是否正确
            </li>
            <li class="item">
              简化查询或尝试其它关键字
            </li>
            <li class="item">
              如有任何意见或建议，请
              <NuxtLink to="/about">
                反馈给我们
              </NuxtLink>
            </li>
          </ul>
        </dd>
      </dl>

      <section
        class="result"
      >
        <ArticleSearchItem
          v-for="record of data"
          :key="record.id"
          :record="record"
          :keyword="keyword"
        />
      </section>
    </div>
  </InfiniteScrolling>
</template>

<script setup lang="ts">
import { getPostsByKeyword } from '~/config/api'
import type { Breadcrumb } from '~/types'
import type { PostItem } from '~/types/response'

const route = useRoute()

const keyword = computed(() => route.query.keyword as string)
const { data, loading, noMore, request, pagination } = usePageFetch<PostItem>(getPostsByKeyword, 1, 10)

const breadcrumbs = computed(() => {
  return [
    {
      value: keyword.value,
      icon: 'search'
    }
  ] as Breadcrumb[]
})

watch(keyword, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    pagination.value.current = 1
    pagination.value.total = 0
    data.value = []
  }

  if (newVal) {
    request({
      keyword: newVal
    })
  }
}, { immediate: true })

useHead({
  title: keyword.value
})
</script>

<style lang="scss" scoped>
.total,
.keyword {
  color: var(--red);
  font-weight: 700;
}

.tips {
  padding: var(--gap-sm) 0;
  font-size: var(--font-size-sm);
  color: var(--secondary-text);
}

.suggestion {
  margin-top: var(--gap-lg);

  .title {
    font-size: var(--font-size-sm);
    font-weight: 700;
  }

  .content {
    margin: var(--gap-sm) 0 0 2em;

    .list {
      list-style: circle;

      .item {
        margin-top: var(--gap-sm);
      }
    }
  }
}
</style>
