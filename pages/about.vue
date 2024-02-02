<template>
  <div class="about">
    <div class="profile">
      Hi, 这里是
      <span class="nickname">{{ data.nickname ?? 'Detail' }}</span>
    </div>

    <div class="intro">
      这家伙很懒，什么也没留下，可以通过下面的方式联系我
    </div>

    <ul class="contact">
      <li
        v-for="item of list"
        :key="item.value"
        class="item"
      >
        <CommonIcon
          :icon="item.icon"
          :size="2"
        />
        <component
          :is="item.isLink ? 'a' : 'span'"
          :href="item.value"
          target="_blank"
        >
          {{ item.value }}
        </component>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getAboutUs } from '~/config/api'

definePageMeta({
  layout: 'no-aside'
})

const { data } = await getAboutUs()

const list = computed(() => {
  return [
    {
      value: data.value.qq,
      icon: 'qq'
    },
    {
      value: data.value.email,
      icon: 'mail'
    },
    {
      value: data.value.github,
      icon: 'github',
      isLink: true
    },
  ]
})

useHead({
  title: '关于我'
})
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap-lg);
  height: 100%;

  .profile {
    width: 30rem;
    font-size: var(--font-size-lg);

    .nickname {
      color: var(--primary-color);
      font-weight: 700;
    }
  }

  .intro {
    width: 30rem;
    color: var(--secondary-text);
  }

  .contact {
    width: 30rem;
    .item {
      display: flex;
      align-items: center;
      gap: var(--gap-sm);
      padding: var(--gap-sm) 0;
    }

    .icon {
      color: var(--secondary-text);
    }
  }
}
</style>
