<template>
  <dl class="suggestion-wrapper">
    <dt class="title">
      温馨提示：
    </dt>
    <dd class="content">
      <ul class="list">
        <li class="item">
          请检查您的输入是否正确
        </li>
        <li class="item">
          简化查询或尝试其它关键字
        </li>
        <li class="item">
          如有任何意见或建议，请
          <nuxt-link to="/about">
            反馈给我们
          </nuxt-link>
        </li>
      </ul>
    </dd>
  </dl>
</template>

<style lang="scss" scoped>
.suggestion-wrapper {
  margin-top: var(--gap24);

  .list {
    padding: var(--gap8) var(--gap24);

    .item {
      position: relative;
      margin: var(--gap8) 0;

      &::before {
        content: '';
        position: absolute;
        left: -18px;
        top: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        box-shadow: -1px -1px 2px var(--shadow-color-light) inset, 1px 1px 2px var(--shadow-color-dark) inset;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
