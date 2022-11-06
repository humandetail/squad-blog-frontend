<template>
  <div class="layout-default">
    <LayoutCATransition />
    <div v-show="visible" class="page-container">
      <LayoutAsideHeader />

      <div id="J_Container" class="container">
        <LayoutContainer>
          <slot />
        </LayoutContainer>

        <LayoutAsideRight />
      </div>

      <LayoutFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
const visible = ref(false)

onMounted(() => {
  visible.value = true
})
</script>

<style lang="scss" scoped>
.layout-default {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.page-container {
  display: grid;
  // gap: var(--gap24);
  max-width: var(--container-width);
  height: 95%;
  margin: 2.5% auto;
  grid-template-columns: 348px calc(100% - 348px);
  grid-template-rows: calc(100% - 44px) 44px;

  .container {
    display: grid;
    grid-template-columns: auto 348px;
    overflow: hidden;
  }

  .page-footer {
    width: 100%;
    grid-column: 1 / 24;
  }

  @media screen and (max-width: 1920px) {
    padding: 0 var(--gap24);
  }

  @media screen and (max-width: 1440px) {
    margin: 1% auto 0;
    height: 98%;

    grid-template-columns: 100%;
    grid-template-rows: 124px calc(100% - 168px) 44px;

    .page-footer {
      grid-column: auto;
    }
  }

  @media screen and (max-width: 960px) {
    margin: 1% auto 0;
    height: 98%;

    grid-template-columns: 100%;
    grid-template-rows: 84px calc(100% - 128px) 44px;

    .page-aside-header {
      padding: 0;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      margin-bottom: var(--gap24);

      :deep(.wrapper) {
        overflow-y: unset;
        box-shadow: unset;
      }
    }

    .page-footer {
      grid-column: auto;
    }

    .container {
      display: block;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      overflow-y: auto;

      .main-wrapper {
        padding: 0;
        overflow: unset;
        :deep(.wrapper) {
          box-shadow: unset;
        }
      }

      .page-aside-right {
        padding: 0;
        overflow: unset;
        margin-top: var(--gap24);

        :deep(.wrapper) {
          box-shadow: unset;
        }
      }
    }
  }
}
</style>
