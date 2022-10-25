<template>
  <section class="blogrolls">
    <header class="header">
      <h3 class="title">
        <CommonIcon icon="link" />
        友情链接
      </h3>
    </header>

    <ul class="list">
      <li
        v-for="item of blogrolls"
        :key="item.id"
        class="item"
      >
        <a
          class="item-link"
          :href="item.link"
          target="_blank"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { getBlogrolls } from '~~/config/api'

const { data } = await getBlogrolls()

const blogrolls = computed(() => (data.value.records || []).map(({ id, name, link }) => ({
  id,
  name,
  link
})))
</script>
