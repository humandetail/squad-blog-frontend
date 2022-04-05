<template>
  <section class="aside-recommended">
    <LayoutAsideHeader
      title="推荐文章"
      icon="star"
    />

    <CommonLoading :loading="pending">
      <ol class="list">
        <li
          v-for="item in records"
          :key="item.id"
          class="item"
        >
          <nuxt-link
            :to="`/posts/${item.id}`"
            class="item-link"
          >
            <div class="cover-pic">
              <img
                :src="item.coverPic"
                :alt="item.title"
              >
            </div>

            <h3 class="title">
              {{ item.title }}
            </h3>
          </nuxt-link>
        </li>
      </ol>
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { POSTS_RECOMMENDED } from '~~/config/api'
import { PageResponseType, PostItem } from '~~/types/response'

const props = withDefaults(defineProps<{
  size?: number;
}>(), {
  size: 5
})

const records = ref<PostItem[]>([])

const { data, pending } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_RECOMMENDED, {
  params: {
    current: 1,
    pageSize: props.size
  }
})

records.value = data.value.records || []
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';
.aside-recommended {
  padding: var(--aside-padding);
  border-radius: var(--border-radius);
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  .item {
    margin-top: .16rem;

    .item-link {
      display: flex;
      align-items: center;
      color: var(--primary-text);

      &:hover {
        color: var(--brand-color);
      }
    }

    .cover-pic {
      width: .75rem;
    }

    .title {
      flex: 1;
      min-width: 0;
      margin-left: .16rem;
      font-size: .16rem;
      line-height: .24rem;
      @include multi-ellipsis(2)
    }
  }
}
</style>
