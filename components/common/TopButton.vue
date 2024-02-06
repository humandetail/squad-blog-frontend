<template>
  <button
    ref="btnRef"
    class="btn-to-top"
    title="返回顶部"
    @click="gotoTop"
  >
    <svg
      class="icon"
      viewBox="0 0 1024 1024"
    >
      <g
        class="main"
        stroke="#333"
        fill="none"
      >
        <g
          class="shell"
          name="shell"
        >
          <path
            d="
            M 520,12
            Q 160,260 320,495
            Q 130,640 305,840
            L 420,685
            L 480,754
            L 518,763
          "
            stroke-width="32"
            stroke-linejoin="round"
          />
          <path
            d="
            M 520,12
            Q 160,260 320,495
            Q 130,640 305,840
            L 420,685
            L 480,754
            L 518,763
          "
            stroke-width="32"
            stroke-linejoin="round"
            style="transform-origin: center center; transform: rotateY(180deg);"
          />
        </g>

        <g name="window">
          <circle
            cx="512"
            cy="320"
            r="114"
            stroke-width="32"
            fill="none"
          />
          <circle
            class="circle-ani"
            cx="512"
            cy="320"
            r="114"
            stroke-width="32"
            fill="none"
            stroke="#f40"
            stroke-dasharray="0 716"
          />
        </g>
      </g>

      <g
        class="fire"
        stroke="#f9f93c"
        fill="#f40"
        name="fire"
      >
        <path
          d="
          M 450,820
          Q 360,906 440,976
          L 475,930
          L 512,1010
          L 549,930
          L 584,976
          Q 664,906 574,820
          C 540,875, 484,875 450,820
          z
        "
          stroke-width="32"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </button>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'

const btnRef = ref<HTMLElement | null>(null)

const handleScroll = debounce(() => {
  if (btnRef.value) {
    btnRef.value.classList[document.documentElement.scrollTop > 100 ? 'add' : 'remove']('visible')
  }
}, 16)

const gotoTop = () => {
  document.documentElement.scroll(0, 0)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.btn-to-top {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 3.2rem;
  right: 3.2rem;
  z-index: 999;
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;
  border: 0;
  background-color: transparent;
  opacity: 0;
  visibility: hidden;
  transition: all .3s ease-in;
  cursor: pointer;

  &:hover {
    .icon {
      .fire {
        opacity: 1;
        animation: open-fire linear .8s infinite;
      }

      .circle-ani {
        animation: circle-ani .3s linear forwards;
      }
    }
  }

  &.visible {
    bottom: 2rem;
    opacity: 1;
    visibility: visible;
  }

  .icon {
    .main {
      stroke: var(--secondary-text);
    }

    .circle-ani {
      stroke: var(--red);
    }

    .fire {
      opacity: 0;
      stroke: var(--orange);
      fill: var(--red);
      transform-origin: center center;
    }
  }
}

@keyframes open-fire {
  0%, 100% {
    transform: translateY(-32px) scaleX(0.8);
  }
  50% {
    transform: translateY(0) scaleX(1);
  }
}

@keyframes circle-ani {
  0% {
    stroke-dasharray: 0 716;
  }
  100% {
    stroke-dasharray: 716 716;
  }
}
</style>
