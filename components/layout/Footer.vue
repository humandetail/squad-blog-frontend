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
.page-footer {
  background-color: rgba(0,0,0,.2);
}
</style>
