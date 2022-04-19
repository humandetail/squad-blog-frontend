<template>
  <ClientOnly>
    <Teleport to="body">
      <section
        v-show="headerDropdown"
        class="dropdown-wrapper"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <LayoutContainer>
          <div class="dropdown-inner">
            <LayoutHeaderDropdownCategories />
            <LayoutHeaderDropdownTags />
          </div>
        </LayoutContainer>
      </section>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const route = useRoute()
const headerDropdown = useHeaderDropdown()

const handleWindowScroll = () => {
  headerDropdown.value = false
}

const handleMouseEnter = () => {
  headerDropdown.value = true

  window.addEventListener('scroll', handleWindowScroll, false)
}

const handleMouseLeave = () => {
  headerDropdown.value = false

  window.removeEventListener('scroll', handleWindowScroll, false)
}

watch(route, () => {
  headerDropdown.value = false
}, { immediate: true })
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
  position: fixed;
  top: .64rem;
  left: 0;
  z-index: 9;
  width: 100%;
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  .dropdown-inner {
    display: flex;
    padding: .48rem .48rem .48rem 2.2rem;

    > :not(:first-child) {
      margin-left: .48rem;
      padding-left: .48rem;
      border-left: 1px solid var(--border-color);
    }
  }
}
</style>
