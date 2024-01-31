<template>
  <main
    ref="contentRef"
    class="posts-content"
    v-html="data[1]"
  ></main>
  <Teleport to=".page-aside">
    <section
      class="toc-wrapper"
      v-html="data[0]"
    ></section>
  </Teleport>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'
import markdown from '@/utils/markdown'
import type { PostData } from '~/types/response'
import { copyCode } from '~/utils'

const props = defineProps<{
  postData: PostData
}>()

const contentRef = ref<HTMLElement | null>(null)

const data = computed<[string, string]>(() => {
  const content = markdown.render(`[TOC]\n${props.postData?.content}` ?? '') ?? ''

  if (!content) {
    return ['', '']
  }

  const match = content.match(/^(<nav class="table-of-contents">[\S\s]+<\/nav>)([\S\s]+)$/)

  if (!match) {
    return ['', '']
  }

  return [match[1], match[2]]
})

let headerObserver: IntersectionObserver | null = null

onMounted(() => {
  document.addEventListener('click', handleClick)

  if (contentRef.value) {
    headerObserver = new IntersectionObserver(toggleTOCActive)

    const oHeaders = contentRef.value.querySelectorAll('h2, h3, h4, h5, h6')

    oHeaders.forEach(header => {
      headerObserver!.observe(header)
    })
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)

  headerObserver?.disconnect()
})

const handleClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement

  if (!target) return

  if (target.classList.contains('hljs-code-copy')) {
    copyCode(target)
  }

  if (target.tagName === 'IMG') {
    window.open((target as HTMLImageElement).src, '_blank')
  }
}

const handleScroll = debounce(() => {
  const oToc = document.querySelector('.toc-wrapper')
  const oActive = oToc?.querySelector('.active')

  if (!oActive) {
    return
  }

  nextTick(() => {
    const { top } = oActive.getBoundingClientRect()
    oToc!.scroll(0, Math.max(0, top - oToc!.getBoundingClientRect().top))
  })
}, 100)

const toggleTOCActive = (entries: IntersectionObserverEntry[]) => {
  const oToc = document.querySelector('.toc-wrapper')

  if (!oToc) {
    return
  }

  entries.forEach(entry => {
    const oA = oToc.querySelector(`a[href="#${entry.target.id}"]`)
    if (oA) {
      oA.classList[entry.intersectionRatio > 0 ? 'add' : 'remove']('active')
    }
  })

  handleScroll()
}
</script>

<style lang="scss">
:is(html[data-theme="dark"]) .posts-content {
  --inline-code-bg: rgba(110,118,129,0.4);
  --tr-bg: rgb(22, 27, 34);
  --code-header-bg: rgb(22, 27, 34);
  --border-color: rgb(48, 54, 61);
  --shadow-color: #302f2f;
}
.posts-content {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 1em;
  line-height: 1.6;
  word-wrap: break-word;

  --inline-code-bg: rgba(175,184,193,0.2);
  --tr-bg: #f6f8fa;
  --code-header-bg: rgb(246, 248, 250);
  --border-color: rgb(208, 215, 222);
  --shadow-color: #bcbcbc;

  > * {
    margin-top: 1.5em !important;

    &:first-child {
      margin-top: 0 !important;
    }
  }

  :is(h1, h2, h3, h4, h5, h6) {
    margin-top: 1em !important;

    & + * {
      margin-top: 1em !important;
    }
  }

  details,
  figcaption,
  figure {
    display: block;
  }

  [hidden] {
    display: none !important;
  }

  a {
    margin: 0 0.1em;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: 600;
  }

  dfn {
    font-style: italic;
  }

  mark {
    background-color: var(--bg);
    color: var(--secondary-text);
  }

  small {
    font-size: 90%;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }
  
  sup {
    top: -0.5em;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    box-shadow: 0 0 1px var(--shadow-color);
    border-style: none;
    box-sizing: content-box;
    background-color: var(--cover-bg);
    cursor: zoom-in;

    &:hover {
      box-shadow: 0 0 1em var(--shadow-color);
    }
  }

  figure {
    margin: 1em 2.4em;
  }

  hr {
    height: .25em;
    margin: var(--gap-lg) 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid var(--border-color);
    background: transparent;
    box-sizing: content-box;
    overflow: hidden;

    &::before {
      content: '';
      display: table;
    }
    
    &::after {
      display: table;
      clear: both;
      content: "";
    }
  }

  input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  [type=button],
  [type=reset],
  [type=submit] {
    -webkit-appearance: button;

    &::-moz-focus-inner {
      outline: 1px dotted ButtonText;
    }
  }

  [type=checkbox],
  [type=radio] {
    box-sizing: border-box;
    padding: 0;
  }

  [type=number]::-webkit-inner-spin-button,
  [type=number]::-webkit-outer-spin-button {
    height: auto;
  }

  [type=search] {
    -webkit-appearance: textfield;
    outline-offset: -.1em;

    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: .54;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  table {
    display: block;
    width: max-content;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    border-radius: .4em;
    overflow: auto;

    td,
    th {
      padding: .4em 1em;
      border: 1px solid var(--border-color);
    }

    th {
      font-weight: 600;
      background-color: var(--code-header-bg);
    }

    tr {
      background-color: var(--bg);

      &:hover {
        background-color: var(--tr-bg);
      }
    }
  }

  :where(pre) details {
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: .4em;
    overflow: hidden;

    summary {
      display: flex;
      height: 2em;
      background-color: var(--code-header-bg);
      user-select: none;
      cursor: pointer;

      .btn-collapse {
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2em;
        height: 2em;
        pointer-events: none;
        transition: transform .2s ease-in;
        fill: var(--secondary-text);
      }

      .hljs-code-header {
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1em;
        flex: 1;

        .hljs-code-lang {
          font-size: .8em;
          color: var(--secondary-text);
        }

        .hljs-code-copy {
          all: unset;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-width: 2em;
          height: 2em;
          padding: 0 0.5em;
          box-sizing: border-box;
          fill: var(--secondary-text);
          cursor: pointer;

          * {
            pointer-events: none;
          }

          > :first-child {
            display: none;
          }

          &.busy {
            cursor: not-allowed;
          }

          &.copied {
            font-size: .8em;
            color: var(--green);
            cursor: not-allowed;

            > :first-child {
              display: inline-block;
            }

            > :last-child {
              display: none;
            }
          }

          &:hover:not(.busy, .copied) {
            fill: var(--primary-text);
          }
        }
      }
    }

    code {
      display: block;
      margin: 0;
      border-top: 1px solid var(--border-color);
      border-radius: 0;
      // word-break: break-all;
      // white-space: pre-wrap;
    }

    &:not([open]) {
      summary {
        .btn-collapse {
          transform: rotate(-1.25turn);
        }
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    padding: .5em 0;
    color: var(--primary-text);
    scroll-margin-top: var(--header-height);

    tt,
    code {
      padding: 0 .2em;
      font-size: inherit;
    }

    &:hover::before {
      content: '#';
      position: absolute;
      left: -1em;
      top: .5em;
      width: 1em;
      text-align: center;
      line-height: inherit;
      font-size: inherit;
    }
  }

  @for $i from 1 through 3 {
    h#{$i} {
      font-size: 1.8em - 0.2 * $i;
      border-bottom: 1px solid var(--border-color);
    }
  }
  @for $i from 4 through 6 {
    h#{$i} {
      font-size: 1em;
    }
  }

  blockquote {
    margin: 0;
    padding: 1em;
    color: var(--secondary-text);
    border-left: .25em solid var(--blue);
    background-color: var(--code-header-bg);

    & + blockquote {
      margin: 0 !important;
    }

    > :first-of-type {
      margin: 0;
    }

    blockquote {
      margin: -1em 0 !important;
    }
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul,
  ol {
    padding-left: 2em;

    ol {
      list-style-type: lower-roman;
    }

    ul,
    ol {
      ol {
        list-style-type: lower-alpha;
      }
    }
  }

  ol {
    padding-left: 1.6rem;

    &[type="1"] {
      list-style-type: decimal;
    }
    &[type="a"] {
      list-style-type: lower-alpha;
    }
    &[type="i"] {
      list-style-type: lower-roman;
    }
  }

  div > ol:not([type]) {
    list-style-type: decimal;
  }

  li {
    > * {
      margin-top: var(--gap);
    }

    + li {
      margin-top: .6em;
    }

    p {
      margin: 0 .25em;
    }
  }

  dl {
    padding: 0;

    dt {
      padding: 0;
      margin-top: 1em;
      font-size: 1em;
      font-style: italic;
      font-weight: 600;
    }

    dd {
      margin-left: 0;
      margin-bottom: 1em;
      padding: 0 1em;
    }
  }

  input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }
  }

  code,
  tt {
    margin: 0 .1em;
    padding: .2em .4em;
    font-size: 85%;
    background: var(--inline-code-bg);
    border-radius: .2em;

    br {
      display: none;
    }
  }

  del code {
    text-decoration: inherit;
  }

  .footnotes {
    ol {
      padding-left: 1.6rem;
    }
  
    li {
      position: relative;

      &:target {
        color: var(--primary-text);

        &::before {
          position: absolute;
          top: -0.8rem;
          right: -0.8rem;
          bottom: -0.8rem;
          left: -2.4rem;
          pointer-events: none;
          content: "";
          border: .2rem solid var(--primary-color);
          border-radius: .6rem;
        }
      }
    }
  }

  .task-list-item {
    list-style-type: none;

    label {
      font-weight: 400;
    }

    &.enabled label {
      cursor: pointer;
    }

    & +.task-list-item {
      margin-top: .3rem;
    }

    .handle {
      display: none;
    }

    .task-list-item-checkbox {
      margin: 0 .2em .25em -1.6em;
      vertical-align: middle;
    }

    .contains-task-list:dir(rtl) .task-list-item-checkbox {
      margin: 0 -1.6em .25em .2em;
    }
  }
  
  ::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }
}
</style>

<style lang="scss">
.toc-wrapper {
  position: sticky;
  top: var(--header-height);
  height: calc(100vh - var(--header-height) - var(--gap));
  overflow-y: auto;

  @media (max-width: 768px) {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    padding: var(--header-height) var(--gap) var(--gap);
    background-color: var(--bg);
  }

  &::before {
    content: '目录';
    position: sticky;
    top: 0;
    display: block;
    width: 100%;
    font-size: 1.8rem;
    padding: var(--gap-sm) 0;
    font-weight: 700;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--bg);

    @media (max-width: 768px) {
      background-color: rgb(var(--bg)/.75);
      backdrop-filter: blur(.8rem);
    }
  }

  .table-of-contents {
    padding: 1.6rem 0;

    ol:not(& > ol) {
      margin-left: 1.2em;
    }

    a {
      color: var(--primary-text);
      text-decoration: none;
      font-size: 1.4rem;
      line-height: 2.4rem;

      &.active,
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}
</style>
