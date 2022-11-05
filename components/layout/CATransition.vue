<template>
  <div ref="containerRef" class="ca-transition-container">
    <canvas
      ref="canvasRef"
      class="canvas"
    />
  </div>
</template>

<script setup lang="ts">
import CATransition from '~~/libs/CATransition'

const themeMode = useThemeMode()

const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()

const cat = ref<CATransition>()

onMounted(() => {
  if (canvasRef.value) {
    const { width, height } = containerRef.value!.getBoundingClientRect()

    cat.value = new CATransition(canvasRef.value, {
      width,
      height
    })

    cat.value.draw({
      circle: {
        duration: 2,
        fill: 'rgba(0, 163, 255, .2)'
      },
      bg: {
        duration: 1,
        fill: themeMode.value === 'dark'
          ? 'rgb(43, 45, 51)'
          : '#ebecf0'
      }
    })

    setTimeout(() => {
      containerRef.value.remove()
    }, 3100)
  }
})
</script>

<style lang="scss" scoped>
.ca-transition-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
}
</style>
