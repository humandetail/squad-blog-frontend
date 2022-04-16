<template>
  <transition
    enter-active-class="animate__animated animate__slideInDown"
  >
    <div
      v-show="visible"
      id="back-top"
      ref="rocketRef"
      class="back-top lv0"
      @click.stop="handleClick"
    >
      <div class="inner" />
    </div>
  </transition>
</template>

<script setup lang="ts">
const { y } = useWindowScroll()

const rocketRef = ref<HTMLDivElement>(null)

const timer = ref<NodeJS.Timeout | null>(null)

const visible = computed(() => y.value > 200)

const handleClick = () => {
  window.scroll({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
  timer.value = setInterval(() => {
    changeRocketState()
  }, 50)
}

const changeRocketState = () => {
  const classList = [...rocketRef.value.classList]

  for (let i = 0; i <= 5; i++) {
    if (classList.includes(`lv${i}`)) {
      rocketRef.value.classList.remove(`lv${i}`)
      rocketRef.value.classList.add(`lv${i === 5 ? 1 : i + 1}`)
      break
    }
  }
}

watch(y, () => {
  if (y.value <= 0) {
    nextTick(() => {
      // 回归初始状态
      rocketRef.value.setAttribute('class', 'back-top lv0')
      clearInterval(timer.value)
    })
  }
})
</script>

<style lang="scss" scoped>
.back-top {
  position: fixed;
  right: 0;
  top: 80%;
  z-index: 11;
  width: 149px;
  height: 250px;
  margin: -125px 0 0;
  padding: 0;
  background: transparent url('/rocket_button_up.png') no-repeat scroll 0 0;
  transition: margin .2s linear;
  cursor: pointer;
  overflow: hidden;
  .inner {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: transparent url('/rocket_button_up.png') no-repeat scroll -149px 0;
    opacity: 0;
    transition: opacity .3s linear;
  }
  &:hover {
    .inner {
      opacity: 1;
    }
  }
  &.finish {
    margin: -1000px 0 0;
  }

  @for $i from 0 through 6 {
    &.lv#{$i} {
      background-position: -149px * $i 0px;
    }
  }
}
</style>
