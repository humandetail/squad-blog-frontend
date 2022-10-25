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
