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
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { PictureItem } from '~~/types/response'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

defineProps<{
  pictures: PictureItem[]
}>()

const modules = [Pagination, A11y]
</script>

<style lang="scss" scoped>
.gallery {
  width: 4.8rem;
  height: 3.6rem;

  ::v-deep(.swiper) {
    width: 100%;
    height: 100%;
  }
}
</style>
