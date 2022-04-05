<template>
  <section class="skills-wrapper">
    <header>
      <h2 class="title">
        我大抵是学废了，细数了一下了解过的技术，这个不会，那个也不会
      </h2>
    </header>

    <ul class="list">
      <li
        v-for="item in skills"
        :key="item.id"
        class="item"
      >
        <div class="info">
          <CommonCoverPic
            :url="item.icon"
            width="0.64rem"
            height="0.64rem"
          />

          <div class="name" :title="item.name">
            {{ item.name }}
          </div>
        </div>

        <div class="desc" :title="item.description">
          {{ item.description }}
        </div>
      </li>

      <li class="item plain">
        <CommonCoverPic
          url="/youseeseeyou.jpg"
          width="2rem"
          height="2rem"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { SkillItem } from '~~/types/response'

defineProps<{
  skills: SkillItem[]
}>()
</script>

<style lang="scss" scoped>
@import '~~/assets/styles/mixins.scss';

.skills-wrapper {
  margin: .48rem 0;
  padding: .24rem;
  border-radius: var(--border-radius);
  background-color: var(--plain-color);
  box-shadow: var(--box-shadow);

  .title {
    font-size: .2rem;
    line-height: .28rem;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: .24rem;
    .item {
      width: 2rem;
      height: 2rem;
      margin: .24rem;
      padding: .14rem;
      border: 1px solid var(--border-color);
      border-radius: .08rem;

      &.plain {
        padding: 0;
        overflow: hidden;
      }

      .info {
        display: flex;
        align-items: center;

        ::v-deep(.cover-pic) {
          border-radius: .08rem;
        }

        .name {
          min-width: 0;
          margin-left: .16rem;
          font-weight: 700;
          @include ellipsis;
        }
      }

      .desc {
        margin-top: .16rem;
        font-size: .16rem;
        @include multi-ellipsis(3);
      }
    }
  }
}
</style>
