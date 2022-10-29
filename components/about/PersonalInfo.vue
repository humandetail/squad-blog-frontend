<template>
  <section class="personal-wrapper">
    <div
      v-if="settings.logoPic"
      class="avatar"
    >
      <img
        :src="settings.logoPic"
        alt="avatar"
      >
    </div>

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
            <component
              :is="item.link ? 'a' : 'span'"
              :href="item.link"
              target="_blink"
              class="value"
              :class="{ 'value-link': item.link }"
            >
              <CommonIcon
                :icon="item.icon"
              />

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

const settings = useSettings()

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap24);
  padding: var(--gap24);

  .avatar {
    width: 200px;
    padding: var(--gap24);
    margin: 0 auto;
    border-radius: 50%;
    // border: 1px solid #ddd;
    box-shadow: var(--box-shadow-reverse);
  }

  .hello-world {
    text-align: center;
    font-size: 24px;
    color: var(--primary-text);

    .nickname {
      font-weight: 700;
      color: var(--brand-color);
    }
  }

  .introduce {
    text-align: center;
    color: var(--secondary-text);
  }

  .contact {
    dt {
      font-size: 18px;
      padding: 0 var(--gap16);
    }

    dd {
      padding: 4px var(--gap16);

      .item {
        margin: var(--gap16) 0;

        .value {
          display: flex;
          align-items: center;
          gap: var(--gap8);
          padding: 0 var(--gap8);
          height: 44px;
          border-radius: 22px;

          .icon {
            font-size: 18px;
            color: var(--primary-text);
            transition: transform linear .3s;
          }

          &:hover {
            .icon {
              transform: rotate(1turn);
            }
          }

          &.value-link {
            color: var(--primary-text);

            &:focus,
            &:hover {
              text-decoration: none;
            }

            &:hover {
              box-shadow: -2px -2px 8px var(--shadow-color-light), 4px 4px 8px var(--shadow-color-dark);
            }

            &:active {
              box-shadow: 2px 2px 8px var(--shadow-color-light), -4px -4px 8px var(--shadow-color-dark);
            }
          }
        }
      }
    }
  }
}
</style>
