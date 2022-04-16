<template>
  <section class="banner">
    <CommonLoading :loading="pending">
      <swiper
        :modules="modules"
        effect="fade"
        :loop="true"
        :lazy="{
          enable: true,
          checkInView: true,
          loadOnTransitionStart: true
        }"
        :preload-images="false"
        :autoplay="true"
        :pagination="{ clickable: true }"
      >
        <swiper-slide
          v-for="item in records"
          :key="item.id"
        >
          <article
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
            <div class="cover">
              <CommonCoverPic
                :url="item.coverPic"
                :to="`/posts/${item.id}`"
                :lazy="true"
                lazy-class-name="swiper-lazy"
                width="4.4rem"
                height="2.8rem"
              />
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
            </div>
          </article>
        </swiper-slide>
      </swiper>

      <div class="banner-pagination" />
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { Pagination, EffectFade, Lazy, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { POSTS_RECOMMENDED } from '~~/config/api'
import { PageResponseType, PostItem } from '~~/types/response'

// import 'swiper/css'
// import 'swiper/scss/effect-fade'
// import 'swiper/css/pagination'
// import 'swiper/css/lazy'

const { data, pending } = await useCustomFetch<PageResponseType<PostItem>>(POSTS_RECOMMENDED, {
  params: {
    current: 1,
    pageSize: 5
  }
})

const records = computed(() => data.value.records)

const modules = [Pagination, EffectFade, Lazy, Autoplay]
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.banner {
  margin: .48rem 0;
  height: 2.8rem;

  .post-item {
    display: flex;
    align-items: center;
    opacity: 0;

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 2.8rem;
      padding: .32rem;

      .title {
        font-size: .32rem;
        line-height: 1;

        a {
          display: block;
          color: var(--primary-text);
          text-decoration: none;
          @include ellipsis;

          &:hover {
            color: var(--brand-color);
          }
        }
      }

      .summary {
        font-size: .2rem;
        color: var(--secondary-text);
        word-break: break-all;
        @include multi-ellipsis(3);
      }

      .btn-more {
        display: inline-block;
        padding: 0 .16rem;
        line-height: .36rem;
        color: var(--brand-color);
        border: 1px solid var(--brand-color);
        border-radius: .04rem;
        background-color: var(--plain-color);
        text-decoration: none;

        &:hover {
          color: var(--plain-color);
          border: 1px solid var(--brand-color);
          background-color: var(--brand-color);
        }
      }
    }

    .cover {
      width: 4.4rem;
      height: 2.8rem;
    }
  }

  ::v-deep(.swiper) {
    .swiper-slide-active {
      .post-item {
        opacity: 1;

        .title {
          animation: slideInLeft .3s ease-in;
        }

        .summary {
          animation: fadeIn .5s ease-in;
        }

        .cover-pic-with-link {
          animation: slideInRight .3s ease-in;
        }
      }
    }

    .swiper-pagination {
      .swiper-pagination-bullet {
        width: .1rem;
        height: .1rem;
        background-color: var(--secondary-text);

        &.swiper-pagination-bullet-active {
          background-color: var(--primary-text);
          box-shadow: var(--banner-bullte-box-shadow);
        }
      }
    }
  }
}
</style>
