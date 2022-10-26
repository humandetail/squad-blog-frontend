<template>
  <section class="personal-wrapper">
    <div
      v-if="settings.logoPic"
      class="avatar"
    >
      <img
        :src="settings.logoPic"
        alt="avatar"
      >
    </div>

    <div class="hello-world">
      <em>Hi,</em>
      我是
      <span class="nickname">
        {{ personalInfo.nickname }}
      </span>
    </div>

    <div class="introduce">
      {{ personalInfo.intro || '这家伙很懒，什么也没留下' }}
    </div>

    <dl class="contact">
      <dt>
        你可以通过以下的任意一种方式找到我：
      </dt>
      <dd>
        <ul>
          <li
            v-for="item in contactList"
            :key="item.id"
            class="item"
          >
            <CommonIcon
              :icon="item.icon"
            />
            <component
              :is="item.link ? 'a' : 'span'"
              :href="item.link"
              target="_blink"
              class="value"
            >
              {{ item.value }}
            </component>
          </li>
        </ul>
      </dd>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { PersonalItem } from '~~/types/response'

const props = defineProps<{
  personalInfo: PersonalItem
}>()

const settings = useSettings()

const contactList = computed(() => {
  const { qq, email, github, blog } = props.personalInfo
  return [
    {
      id: 'qq',
      value: qq,
      icon: 'qq'
    },
    {
      id: 'email',
      value: email,
      icon: 'mail'
    },
    {
      id: 'github',
      value: github,
      icon: 'github',
      link: github
    },
    {
      id: 'blog',
      value: blog,
      icon: 'link',
      link: blog
    }
  ]
})
</script>
