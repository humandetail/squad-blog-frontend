<template>
  <section class="tags">
    <header class="header">
      <h2 class="title">
        标签
      </h2>
    </header>

    <ul class="list">
      <li
        v-for="item of tags"
        :key="item.id"
        class="item"
      >
        <NuxtLink
          :to="`/tags/${item.name}`"
          class="item-link"
        >
          {{ item.displayName }}
          ({{ item.postCount }})
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { getTags } from '~/config/api'

const tags = useTags()

if (tags.value.length === 0) {
  const { data } = await getTags()
  tags.value = data.value?.records ?? []
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-sm);
  margin-top: var(--gap);
  font-size: 1.2rem;

  .item-link {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: calc(var(--gap-sm) / 4) var(--gap-sm);
    color: var(--white);
    border: 1px solid transparent;
    border-radius: calc(var(--gap-sm) / 2);
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: -2;
      width: 100%;
      height: 100%;
      background-color: var(--red);
      border-radius: calc(var(--gap-sm) / 2);
      transform-origin: center center;
      transform: translate(-50%, -50%);
    }

    &::after {
      content: '';
      position: absolute;
      left: 1px;
      top: 1px;
      z-index: -1;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      background-color: var(--bg);
      border-radius: .3rem;
      opacity: 0;
    }

    &:hover {
      color: var(--primary-text);

      &::before {
        animation: roundAni .2s ease-in forwards;
      }

      &::after {
        opacity: 1;
      }
    }
  }

  :nth-child(4n) {
    .item-link::before {
      background-color: rgb(from var(--red) r g b / .8);
    }
  }

  :nth-child(4n + 1) {
    .item-link::before {
      background-color: rgb(from var(--green) r g b / .8);
    }
  }

  :nth-child(4n + 2) {
    .item-link::before {
      background-color: rgb(from var(--blue) r g b / .8);
    }
  }

  :nth-child(4n + 3) {
    .item-link::before {
      background-color: rgb(from var(--orange) r g b / .8);
    }
  }
}

@keyframes roundAni {
  from {
    transform: translate(-50%, -50%) rotate(0);
    // height: 100%;
  }

  to {
    // height: 135%;
    transform: translate(-50%, -50%) scale(1.4) rotate(145deg);
  }
}
</style>
