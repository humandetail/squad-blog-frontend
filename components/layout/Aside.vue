<template>
  <aside class="page-aside">
    <LayoutAsideRecommended
      v-if="recommendedVisible"
      :size="5"
      :style="{ order: recommendedOrder }"
    />
    <LayoutAsideTags
      v-if="tagsVisible"
      :style="{ order: tagsOrder }"
    />
  </aside>
</template>

<script setup lang="ts">
import { AsideModules } from '~~/types'
const props = withDefaults(defineProps<{
  modules?: AsideModules[]
}>(), {
  modules: () => ['recommended', 'tags']
})

const recommendedVisible = ref(false)
const tagsVisible = ref(false)
const recommendedOrder = ref(1)
const tagsOrder = ref(2)

watchEffect(() => {
  const { modules } = props
  recommendedVisible.value = modules.includes('recommended')
  tagsVisible.value = modules.includes('tags')
  recommendedOrder.value = modules.indexOf('recommended')
  tagsOrder.value = modules.indexOf('tags')
})
</script>

<style lang="scss" scoped>
.page-aside {
  display: flex;
  flex-direction: column;
  width: var(--aside-width);

  > :not(:first-child) {
    margin-top: .48rem;
  }
}
</style>
