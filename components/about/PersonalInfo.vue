<template>
  <section class="personal-wrapper">
    <div class="hello-world">
      <em>Hi,</em>
      我是
      <span class="nickname">
        {{ personalInfo.nickname }}
      </span>
    </div>

    <div class="introduce">
      {{ personalInfo.intro || '这家伙很懒，什么也没留下' }}
    </div>

    <dl class="contact">
      <dt>
        你可以通过以下的任意一种方式找到我：
      </dt>
      <dd>
        <ul>
          <li
            v-for="item in contactList"
            :key="item.id"
            class="item"
          >
            <span
              class="iconfont"
              :class="`icon-${item.icon}`"
            />
            <component
              :is="item.link ? 'a' : 'span'"
              :href="item.link"
              target="_blink"
              class="value"
            >
              {{ item.value }}
            </component>
          </li>
        </ul>
      </dd>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { PersonalItem } from '~~/types/response'

const props = defineProps<{
  personalInfo: PersonalItem
}>()

const contactList = computed(() => {
  const { qq, email, github, blog } = props.personalInfo

  return [
    {
      id: 'qq',
      value: qq,
      icon: 'qq'
    },
    {
      id: 'email',
      value: email,
      icon: 'mail'
    },
    {
      id: 'github',
      value: github,
      icon: 'github',
      link: github
    },
    {
      id: 'blog',
      value: blog,
      icon: 'link',
      link: blog
    }
  ]
})
</script>

<style lang="scss" scoped>
.personal-wrapper {
  margin: .48rem 0;
  padding: 0 .24rem;

  .hello-world {
    display: flex;
    align-items: flex-end;
    font-weight: 700;
    font-size: .24rem;
    line-height: 2;

    em {
      margin-right: .04rem;
      font-size: 1.08rem;
      line-height: 1;
      font-style: normal;
    }

    .nickname {
      color: var(--brand-color);
    }
  }

  .introduce {
    margin: .32rem 0;
    font-size: .2rem;
    color: var(--secondary-text);
  }

  .contact {
    dt {
      font-weight: 700;
      font-size: .2rem;
    }

    dd {
      margin-top: .16rem;

      .item {
        display: flex;
        align-items: center;
        margin: .08rem;

        .iconfont {
          margin-right: .08rem;
          font-size: .24rem;
        }

        .value {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
