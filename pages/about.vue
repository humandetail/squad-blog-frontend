<template>
  <div class="about-page">
    <CommonLoading :loading="pending">
      <AboutPersonalInfo
        :personal-info="personalInfo"
      />

      <AboutSkills
        :skills="skills"
      />

      <AboutWorks
        :works="works"
      />
    </CommonLoading>
  </div>
</template>

<script setup lang="ts">
import { ABOUT_US } from '~~/config/api'
import { PersonalItem, AboutUsData } from '~~/types/response'

definePageMeta({
  key: 'about',
  pageTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__rollIn',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  },
  layoutTransition: {
    duration: 500,
    enterActiveClass: 'animate__animated animate__zoomInUp',
    leaveActiveClass: 'animate__animated animate__zoomOutDown'
  }
})

const personalInfo = ref<PersonalItem>()
const settings = useSettings()

useHead({
  title: `关于我 - ${settings.value.seoTitle}`
})

const { data, pending } = await useCustomFetch<AboutUsData>(ABOUT_US)

const { skills, works, ...info } = data.value

personalInfo.value = info
</script>
