<template>
  <div class="gallery">
    <swiper
      :modules="modules"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="(item, index) in pictures"
        :key="index"
      >
        <CommonCoverPic
          :url="item.url"
          width="4.8rem"
          height="3.6rem"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { PictureItem } from '~~/types/response'

import 'swiper/css'
import 'swiper/css/pagination'

defineProps<{
  pictures: PictureItem[]
}>()

const modules = [Pagination]
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
