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

const personalInfo = ref<PersonalItem>()

const { data, pending } = await useCustomFetch<AboutUsData>(ABOUT_US)

const { skills, works, ...info } = data.value

personalInfo.value = info
</script>
