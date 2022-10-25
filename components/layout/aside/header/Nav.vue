<template>
  <nav class="nav">
    <ul class="nav-list">
      <li
        v-for="item of navs"
        :key="item.name"
        class="nav-item"
      >
        <nuxt-link
          :to="item.name"
          class="nav-item-link"
        >
          {{ item.displayName }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { getCategories } from '~~/config/api'

const { data } = await getCategories()

const navs = computed(() => {
  return [
    {
      name: '/',
      displayName: '首页'
    },
    ...(data.value.records || []).map(item => ({
      name: `/categories/${item.name}`,
      displayName: item.displayName
    })),
    {
      name: '/about',
      displayName: '关于我们'
    }
  ]
})
</script>
