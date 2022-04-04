<template>
  <div
    v-if="!isEmpty"
    class="common-breadcrumb"
  >
    <ul class="breadcrumb">
      <li class="item loction">
        <span class="iconfont icon-location" />
      </li>
      <li class="item">
        <nuxt-link to="/">
          首页
        </nuxt-link>
      </li>
      <template
        v-for="route in routes"
        :key="route.name"
      >
        <li v-if="divider" class="item divider">
          {{ divider }}
        </li>
        <li class="item">
          <span
            v-if="route.icon"
            class="iconfont"
            :class="`icon-${route.icon}`"
          />
          {{ route.name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { BreadcrumbRoute, BreadcrumbDivider } from '~~/types'

const props = withDefaults(defineProps<{
  routes?: BreadcrumbRoute[];
  divider?: BreadcrumbDivider;
}>(), {
  routes: () => [],
  divider: '/'
})

const isEmpty = computed(() => !props.routes || props.routes.length === 0)
</script>

<style lang="scss" scoped>
.common-breadcrumb {
  margin: .48rem 0;
  font-size: .2rem;
  line-height: 1;

  .breadcrumb {
    display: flex;
    align-items: center;

    .item {
      display: flex;
      align-items: center;
      color: var(--secondary-text);

      .iconfont {
        font-size: .2rem;
      }

      a {
        color: var(--secondary-text);
        text-decoration: none;

        &:hover {
          color: var(--brand-color);
        }
      }

      & + .item {
        margin-left: .08rem;
      }

      &:last-child {
        color: var(--primary-text);
      }
    }

    .iconfont {
      font-size: .24rem;
    }
  }
}
</style>
