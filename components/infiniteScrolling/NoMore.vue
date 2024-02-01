<template>
  <div class="no-more">
    <span>我也是有底线的</span>
  </div>
</template>

<style lang="scss" scoped>
.no-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gap-sm);

  > span {
    position: relative;
    line-height: 2.4rem;
    color: var(--secondary-text);
    font-size: 1.4rem;
    padding: 0 var(--gap-sm);

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 30%;
      height: 1px;
      background-color: var(--secondary-text);
      transform: translate(0, -50%);
    }

    &::before {
      left: -30%;
    }

    &::after {
      right: -30%;
    }
  }
}
</style>
