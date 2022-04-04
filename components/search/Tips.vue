<template>
  <div class="tips">
    <div v-if="total > 0" class="has-results">
      为您找到
      <span class="total">
        {{ total }}
        个
      </span>
      与“
      <span class="keyword">
        {{ keyword }}
      </span>
      ”相关的内容。
    </div>

    <div v-else class="no-results">
      抱歉没有找到与“
      <span class="keyword">
        {{ keyword }}
      </span>
      ”相关的内容。
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  keyword: string;
  total: number;
}>()
</script>

<style lang="scss" scoped>
.tips {
  padding-left: .16rem;
  font-size: .18rem;
  font-weight: 700;

  .total,
  .keyword {
    color: var(--danger-color);
  }
}
</style>
