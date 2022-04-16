<template>
  <div class="gallery">
    <swiper
      :modules="modules"
      :lazy="{
        enable: true,
        checkInView: true,
        loadOnTransitionStart: true
      }"
      :preload-images="false"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="(item, index) in pictures"
        :key="index"
      >
        <CommonCoverPic
          :url="item.url"
          :lazy="true"
          lazy-class-name="swiper-lazy"
          width="4.8rem"
          height="3.6rem"
        />
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Pagination, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { PictureItem } from '~~/types/response'

// import 'swiper/css'
// import 'swiper/css/pagination'

defineProps<{
  pictures: PictureItem[]
}>()

const modules = [Pagination, Lazy]
</script>

<style lang="scss" scoped>
.gallery {
  width: 4.8rem;
  height: 3.6rem;

  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;

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
</style>
