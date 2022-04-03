<template>
  <section class="copyright-wrapper">
    <div class="copyright">
      © 2014 - {{ new Date().getFullYear() }} Humandetail. All Rights Reserved.
    </div>

    <div class="icp">
      <a
        href="http://beian.miit.gov.cn/"
        target="_blank"
      >
        粤ICP备14074910号
      </a>
      <a
        href="http://www.beian.gov.cn/"
        target="_blank"
      >
        粤公网安备44010602007739
      </a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.copyright-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: .24rem;
  padding: .48rem 0;
  color: var(--plain-color);
  border-top: 1px solid var(--plain-color);

  .icp {
    a {
      color: inherit;

      & + a {
        margin-left: .24rem;
      }
    }
  }
}
</style>
