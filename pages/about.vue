<template>
  <div class="about-page">
    <CommonLoading :loading="pending">
      <AboutPersonalInfo
        :personal-info="personalInfo"
      />
    </CommonLoading>
  </div>
</template>

<script setup lang="ts">
import { getAboutUs } from '~~/config/api'
import { PersonalItem } from '~~/types/response'

const { data, pending } = await getAboutUs()

const personalInfo = computed<PersonalItem>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { skills, works, ...info } = data.value
  return info
})
</script>
