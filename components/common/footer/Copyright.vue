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
  font-size: var(--font-size-sm);

  .icp {
    display: inline-flex;
    flex-wrap: wrap;
    gap: var(--gap-sm);
    margin-top: var(--gap-sm);

    a {
      color: var(--secondary-text);
      text-decoration: none;
    }
  }
}
</style>
