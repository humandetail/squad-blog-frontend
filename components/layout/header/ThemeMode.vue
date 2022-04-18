<template>
  <ClientOnly>
    <div class="mode-wrapper">
      <span
        class="item"
        :class="{ active: mode === Theme.default }"
        @click="handleChange(Theme.default)"
      >
        默认主题
      </span>
      <span class="item divider">/</span>
      <span
        class="item"
        :class="{ active: mode === Theme.dark }"
        @click="handleChange(Theme.dark)"
      >
        暗黑主题
      </span>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Theme } from '~~/config/constants'
const mode = useThemeMode()

const handleChange = (value: Theme) => {
  mode.value = value
}
</script>

<style lang="scss" scoped>
.mode-wrapper {
  display: flex;
  align-items: center;
  margin-left: .24rem;

  .item {
    cursor: pointer;

    &.divider {
      margin: 0 .08rem;
      color: var(--border-color);
      font-size: .16rem;
      cursor: default;
    }

    &.active {
      color: var(--brand-color)
    }
  }
}
</style>
