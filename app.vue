<template>
  <div style="height: 100%">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage
        :page-key="route => route.fullPath"
        :keepalive="true"
      />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { getSettings, report } from './config/api'

const router = useRouter()

router.afterEach((_to, from) => {
  doReport(from.fullPath)
})

onMounted(() => {
  nextTick().then(() => {
    doReport()
  })
})

const settings = useSettings()

if (!settings.value) {
  const { data } = await getSettings()

  settings.value = data.value
}

useHead({
  titleTemplate: (titleChunks) => {
    return titleChunks
      ? `${titleChunks} - ${settings.value?.seoTitle ?? ''}`
      : settings.value?.seoTitle ?? ''
  },
  meta: [
    { name: 'keywords', content: settings.value?.seoKeywords },
    { name: 'description', content: settings.value?.seoDescription }
  ]
})

const doReport = (from?: string) => {
  try {
    const page = encodeURI(location.href)
    const ua = navigator.userAgent ?? ''
    const source = encodeURI(from ? from : (document.referrer ?? ''))

    report({
      page,
      ua,
      source
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
</script>
