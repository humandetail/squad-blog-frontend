<template>
  <div class="page-not-found">
    <h1 class="title">
      404
    </h1>

    <h2 class="sub-title">
      PAGE NOT FOUND.
    </h2>

    <section class="wrapper">
      <header class="header">
        <h3 class="h3">
          网上说
        </h3>
      </header>

      <div class="content">
        <p>用户无意进入这个页面，不能指责用户，所以我无话可说。</p>
      </div>
    </section>

    <section class="wrapper">
      <header class="header">
        <h3 class="h3">
          网上说
        </h3>
      </header>

      <div class="content">
        <p>需要在这个页面给用户一些指引，所以我简单地分析了一下原因：</p>
        <ol class="reasons">
          <li class="item">
            您访问的地址已失效，很有可能是该死的管理更改了地址；
          </li>
          <li class="item">
            文件目录或文件名称更改；
          </li>
          <li class="item">
            您可能输入了错误的地址，请重试一下。
          </li>
        </ol>
      </div>
    </section>

    <section class="wrapper">
      <header class="header">
        <h3 class="h3">
          网上说
        </h3>
      </header>

      <div class="content">
        <p>
          需要给用户一个返回网站的
          <nuxt-link to="/search">
            链接
          </nuxt-link>
          ，这个
          <nuxt-link to="/search">
            链接
          </nuxt-link>
          还不能指向首页，因为这样有可能导致SEO的蜘蛛认为我们的首页找不到。
        </p>
        <p>
          所以这里是
          <nuxt-link to="/search">
            返回页面的链接
          </nuxt-link>
          。
        </p>
      </div>
    </section>

    <footer class="footer">
      <p>
        ——这些都是网上说的
        <nuxt-link to="/about">
          @Humandetail
        </nuxt-link>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
const settings = useSettings()

useHead({
  title: `PAGE NOT FOUND - ${settings.value.seoTitle}`
})
</script>

<style lang="scss" scoped>
.page-not-found {
  width: 960px;
  margin: 0 auto;
  padding: .32rem;

  p {
    text-indent: 2em;
    margin-top: .24rem;
  }
}
.title {
  font-size: 1.28rem;
  line-height: 1.6;
  text-align: center;
}

.sub-title {
  font-size: .64rem;
  line-height: 1.6;
  text-align: center;
  color: var(--secondary-text);
}

.wrapper {
  & + .wrapper {
    margin-top: .32rem;
  }
}

.reasons {
  margin: .24rem 0 0 3em;
  list-style: decimal;
}

.footer > p {
  text-align: right;
}
</style>
