<template>
  <section ref="bannerRef" class="banner">
    <div class="wrapper">
      <CommonLoading :loading="pending">
        <article
          v-for="item in records"
          :key="item.id"
          class="post-item"
        >
          <div class="content">
            <h2 class="title">
              <nuxt-link
                :to="`/posts/${item.id}`"
              >
                {{ item.title }}
              </nuxt-link>
            </h2>

            <div class="summary">
              {{ item.summary }}
            </div>

            <div class="extra">
              <nuxt-link
                :to="`/posts/${item.id}`"
                class="btn-more"
              >
                查看更多
              </nuxt-link>
            </div>
          </div>
          <div class="cover" @click="handleCoverClick(item.id)">
            <img
              :src="item.coverPic"
              class="cover-img"
              alt="item.title"
            >
          </div>
        </article>
      </CommonLoading>
    </div>
  </section>
</template>

<script setup lang="ts">
import Carousel from '@humandetail/carousel'
import { getRecommendedPosts } from '~~/config/api'
import '@humandetail/carousel/index.css'

const router = useRouter()

const bannerRef = ref<HTMLElement>()
const { data, pending } = await getRecommendedPosts(1, 5)

const records = computed(() => data.value.records)

const handleCoverClick = (id: string) => {
  router.push(`/posts/${id}`)
}

watch(bannerRef, () => {
  if (bannerRef.value) {
    setTimeout(() => {
      // eslint-disable-next-line no-new
      new Carousel(bannerRef.value, {
        loop: true,
        draggable: true,
        delay: 3000,
        autoplay: true
      })
    }, 100)
  }
})

</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.banner {
  position: relative;
  padding: var(--gap16);
  border-radius: var(--border-radius);
  box-shadow: -2px -2px 4px var(--shadow-color-dark), 2px 2px 4px var(--shadow-color-light);

  @media screen and (max-width: 768px) {
    padding: 0;
    border-radius: 0;
    box-shadow: unset;
  }

  // 处理边界
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100%;
    width: 2px;
    background-color: var(--background-color);
  }

  .wrapper {
    height: 280px;
    overflow: hidden;

    // @media screen and (max-width: 768px) {
    @media screen and (max-width: 1200px) {
      height: auto;
    }
  }
}

.post-item {
  display: flex;
  justify-content: space-between;
  gap: var(--gap24);
  height: 280px;
  padding: 0 var(--gap16);
  overflow: hidden;

  @media screen and (max-width: 768px) {
    justify-content: center;
    height: auto;
    padding: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    min-width: 0;
    padding: var(--gap16) 0;

    @media screen and (max-width: 768px) {
      display: none;
    }

    .title {
      font-size: 20px;
      max-height: 64px;
      line-height: 32px;
      @include multi-ellipsis(2);
    }

    .summary {
      max-height: 72px;
      padding: 0 var(--gap16) 0 var(--gap32);
      line-height: 24px;
      color: var(--secondary-text);
      white-space: break-word;
      @include multi-ellipsis(3);
    }

    .btn-more {
      padding: var(--gap8) var(--gap24);
      border-radius: 4px;
      box-shadow: -1px -1px 2px var(--shadow-color-light), 1px 1px 2px var(--shadow-color-dark);

      &:focus,
      &:hover {
        text-decoration: none;
      }

      &:active {
      box-shadow: -1px -1px 2px var(--shadow-color-light) inset, 1px 1px 2px var(--shadow-color-dark) inset;
      }
    }
  }

  .cover-img {
    height: 280px;

    // @media screen and (max-width: 768px) {
    @media screen and (max-width: 1200px) {
      width: 100%;
      height: auto;
      aspect-ratio: 440 / 280;
    }
  }
}
</style>
