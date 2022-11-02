<template>
  <section class="posts-new">
    <header class="header">
      <h1 class="title">
        最新文章
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
          <article class="post-item">
            <CommonCoverPic
              :url="item.coverPic"
              :alt="item.title"
              :to="`/posts/${item.id}`"
            />

            <h2 class="title">
              <nuxt-link :to="`/posts/${item.id}`">
                {{ item.title }}
              </nuxt-link>
            </h2>

            <div class="summary">
              {{ item.summary }}
            </div>

            <div class="widgets">
              <PostWidget
                :value="getTime(item.createdTime)"
                icon="time"
              />
              <PostWidget
                :value="item.categoryDisplayName"
                :link="`/categories/${item.categoryName}`"
                icon="category"
              />
              <PostWidget
                :value="item.author"
                link="/about"
                icon="user"
              />
              <PostWidget
                v-show="false"
                class="time"
                :value="getTime(item.createdTime)"
                icon="time"
              />
            </div>
          </article>
        </li>
      </ul>
    </CommonLoading>
  </section>
</template>

<script setup lang="ts">
import { formatDate } from '~~/libs/utils'
import { getNewPosts } from '~~/config/api'

const { data, pending } = await getNewPosts()

const records = computed(() => data.value.records)

const getTime = (dateLinkString: string) => formatDate(dateLinkString, 'YYYY年MM月DD日')

</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.header {
  margin-top: var(--gap16);
  padding: var(--gap16);

  .title {
    text-align: center;
    font-size: 32px;
    color: var(--background-color);
    text-shadow: 1px 1px 2px var(--shadow-color-dark), -1px -1px 2px var(--shadow-color-light);
  }
}

.posts {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;

  .item {
    width: calc(50% - 16px);

    .post-item {
      padding: var(--gap16);
      border-radius: var(--gap8);

      &:hover {
        box-shadow: 2px 2px 4px var(--shadow-color-dark), -2px -2px 4px var(--shadow-color-light);
      }

      .title {
        margin-top: var(--gap16);
        font-size: 20px;
        @include ellipsis;
      }

      .summary {
        margin: var(--gap16) 0;
        line-height: 24px;
        height: 48px;
        color: var(--secondary-text);
        white-space: break-word;
        @include multi-ellipsis(2);
      }

      .widgets {
        display: flex;
        align-items: center;
        gap: var(--gap8);
      }
    }

    &:nth-child(3n) {
      width: 100%;

      .post-item {
        display: grid;
        grid-template-columns: 40% calc(60% - 16px);
        gap: 16px;

        .title {
          // grid-column: 1 / 24;
          grid-row: 1 / 2;
        }

        .summary {
          // grid-column: 1 / 14;
          grid-row: 2 / 4;
          height: 72px;
          margin: 0;
          @include multi-ellipsis(3);
        }

        .widgets {
          // grid-column: 1 / 14;
          grid-row: 4 / 5;
        }

        .cover-pic-with-link {
          // grid-column: 14 / 24;
          grid-row: 1 / 5;
          order: -1;
        }
      }
    }
  }
}
</style>
