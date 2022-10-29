<template>
  <footer class="page-footer">
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
  </footer>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.copyright-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gap16);
  height: 100%;
  line-height: 1.1;
  color: var(--secondary-text);

  @media screen and (max-width: 640px) {
    font-size: 10px;
    line-height: 1.2;
  }

  .icp a {
    color: var(--secondary-text)
  }
}
</style>
