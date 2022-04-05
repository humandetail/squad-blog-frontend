<template>
  <section class="works-wrapper">
    <header>
      <h2 class="title">
        曾经做过这些项目
      </h2>
    </header>

    <ul class="list">
      <li
        v-for="item in works"
        :key="item.id"
        class="item"
      >
        <AboutWorksGallery
          :pictures="item.pictures"
        />
        <div class="info">
          <div class="name">
            {{ item.name }}
          </div>

          <div class="desc">
            {{ item.description }}
          </div>

          <div class="links">
            <a
              v-for="link in getButtons(item)"
              :key="link.id"
              :href="link.link"
              class="link"
              target="_blink"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { WorkItem } from '~~/types/response'

defineProps<{
  works: WorkItem[]
}>()

const getButtons = ({ link }: WorkItem) => {
  if (!link) {
    return []
  }

  const links = link.split(',')

  if (links.length === 1) {
    return [
      { id: 1, link: link[0], name: '查看详情' }
    ]
  }

  return link.split(',').map((item, index) => ({ id: index + 1, link: item, name: `链接${index + 1}` }))
}
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.works-wrapper {
  margin: .48rem 0;
  padding: .24rem;

  .title {
    font-size: .2rem;
    line-height: .28rem;
  }

  .list {
    margin-top: -.48rem;
  }

  .item {
    display: flex;
    align-items: center;
    padding: .48rem 0;

    & + .item {
      border-top: 1px solid var(--border-color);
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      margin-left: .24rem;

      .name {
        font-size: .24rem;
        line-height: 2;
        font-weight: 700;
        @include ellipsis;
      }

      .desc {
        margin: .16rem 0;
        color: var(--secondary-text);
        @include multi-ellipsis(4);
      }

      .links {
        display: flex;

        .link {
          padding: 0 .36rem;
          line-height: .48rem;
          border-radius: .24rem;
          color: #fff;
          background-color: var(--brand-color);
          text-decoration: none;

          &:hover {
            opacity: .8;
          }

          & + .link {
            margin-left: .24rem;
          }
        }
      }
    }

    &:nth-child(2n) {
      .info {
        order: 1;
        margin-left: 0;
        margin-right: .24rem;
      }

      ::v-deep(.gallery) {
        order: 2;
      }
    }
  }
}
</style>
