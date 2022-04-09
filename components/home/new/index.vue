<template>
  <section class="posts-new">
    <header class="header">
      <h1 class="title">
        <span class="iconfont icon-quote-left" />
        <span>
          最新文章
        </span>
      </h1>
    </header>

    <div class="track" />

    <CommonLoading :loading="pending">
      <ul class="posts">
        <li
          v-for="item in records"
          :key="item.id"
          class="item"
        >
          <div class="placeholder">
            <CommonPostWidget
              :value="getTime(item.createdTime)"
              icon="time"
            />
          </div>
          <article class="post-item">
            <h2 class="title">
              <nuxt-link :to="`/posts/${item.id}`">
                {{ item.title }}
              </nuxt-link>
            </h2>

            <div class="content">
              <CommonCoverPic
                :url="item.coverPic"
                :to="`/posts/${item.id}`"
                width="2.21rem"
                height="1.4rem"
              />

              <div class="info">
                <div class="summary">
                  {{ item.summary }}
                </div>

                <div class="widgets">
                  <CommonPostWidget
                    :value="item.categoryDisplayName"
                    :link="`/categories/${item.categoryName}`"
                    icon="category"
                  />
                  <CommonPostWidget
                    :value="item.author"
                    link="/about"
                    icon="user"
                  />
                </div>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { formatDate } from '@vueuse/shared'
import { POSTS_NEW } from '~~/config/api'

const { data, pending } = await useCustomFetch(POSTS_NEW)

const records = computed(() => data.value.records)

const getTime = (dateLinkString: string) => formatDate(new Date(dateLinkString), 'YYYY年M月D日')

</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';
$danger-color: var(--danger-color);

.posts-new {
  position: relative;
  margin: .48rem 0;
  padding: .96rem;
  border-radius: var(--border-radius);
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  .header {
    display: flex;
    align-items: center;
    .title {
      font-size: .32rem;
      line-height: .96rem;
      .iconfont {
        color: var(--secondary-color);
        font-size: .72rem;
      }
    }
  }
  .posts {
    margin: .24rem 0;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 2.2rem;

      &:hover {
        .placeholder{
          ::v-deep(.post-widget) {
            animation: bounceIn 1s;
          }

          &::before {
            border-color: var(--danger-color) !important;
            animation: breathe 1s linear infinite alternate-reverse;
          }
        }
      }

      &:not(:first-child) {
        margin-top: .48rem;
      }

      .placeholder {
        position: relative;
        order: 2;
        width: 50%;
        height: 100%;
        padding: .16rem;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: .32rem;
          width: .1rem;
          height: .1rem;
          border-radius: 50%;
          background-color: var(--plain-color);
          border: 2px solid var(--timeline-background);
          transform: translate(-50%, -50%);
        }
      }

      .post-item {
        position: relative;
        width: 4.9rem;
        padding: .16rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        background-color: var(--plain-color);
        order: 1;

        &:hover {
          box-shadow: var(--box-shadow);
        }

        .title {
          font-size: .24rem;
          color: var(--primary-text);
          text-decoration: none;

          a {
            display: block;
            line-height: .32rem;
            color: inherit;
            @include ellipsis;
          }

          &:hover {
            color: var(--brand-color);
          }
        }

        .content {
          display: flex;
          margin-top: .16rem;

          .info {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 1.4rem;
            margin-left: .16rem;

            .summary {
              min-height: 0;
              height: .96rem;
              font-size: .16rem;
              line-height: .24rem;
              color: var(--secondary-text);
              @include multi-ellipsis(4);
            }

            .widgets {
              > * {
                font-size: .16rem;

                &:not(:first-child) {
                  margin-left: .08rem;
                }
              }
            }
          }
        }
      }

      &:nth-child(2n) {
        .placeholder {
          text-align: right;
          &::before {
            content: '';
            position: absolute;
            right: 0;
            left: auto;
            top: .32rem;
            width: .1rem;
            height: .1rem;
            border-radius: 50%;
            background-color: var(--plain-color);
            border: 2px solid var(--timeline-background);
            transform: translate(50%, -50%);
          }
        }
        .post-item {
          order: 2;

          &::before {
            content: '';
            position: absolute;
            left: -.16rem;
            top: .16rem;
            border-right: .16rem solid var(--border-color);
            border-top: .16rem solid transparent;
            border-bottom: .16rem solid transparent;
          }

          &::after {
            content: '';
            position: absolute;
            left: -.14rem;
            top: .16rem;
            border-right: .16rem solid var(--plain-color);
            border-top: .16rem solid transparent;
            border-bottom: .16rem solid transparent;
          }
        }

        .placeholder {
          order: 1;
        }
      }

      &:nth-child(2n + 1) {
        .post-item {
          &::before {
            content: '';
            position: absolute;
            right: -.16rem;
            top: .16rem;
            border-left: .16rem solid var(--border-color);
            border-top: .16rem solid transparent;
            border-bottom: .16rem solid transparent;
          }

          &::after {
            content: '';
            position: absolute;
            right: -.14rem;
            top: .16rem;
            border-left: .16rem solid var(--plain-color);
            border-top: .16rem solid transparent;
            border-bottom: .16rem solid transparent;
          }
        }
      }
    }
  }

  .track {
    position: absolute;
    left: 50%;
    top: 1.44rem;
    width: .02rem;
    height: calc(100% - .96rem - .96rem - .24rem);
    background-color: var(--timeline-background);
    transform: translateX(-50%);
  }
}

@keyframes breathe {
  from {
    box-shadow: 0 0 1px rgba(255,0,0,.8);
  }

  to {
    box-shadow: 0 0 10px rgba(255,0,0,.8);
  }
}
</style>
