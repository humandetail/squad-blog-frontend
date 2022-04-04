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
  padding-left: .16rem;
  font-size: .16rem;
  .title {
    color: var(--secondary-text);
  }

  .content {
    margin-top: .16rem;
  }

  .item:not(:first-child) {
    margin-top: .08rem;
  }
}
</style>
