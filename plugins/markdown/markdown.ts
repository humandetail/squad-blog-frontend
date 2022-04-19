import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import uslug from 'uslug'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
// import MarkdownItEmoji from 'markdown-it-emoji'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItAbbr from 'markdown-it-abbr'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItIns from 'markdown-it-ins'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItTaskLists from 'markdown-it-task-lists'
import MarkdownItContainer from 'markdown-it-container'
// import MarkdownItGraphviz from 'markdown-it-graphviz'
// import MarkdownItLatex from 'markdown-it-latex'

// import 'markdown-it-latex/dist/index.css'

const createCodeCopyIcon = (str: string) => `<span class="copy iconfont icon-file-copy" data-source="${markdown.utils.escapeHtml(str)}" title="复制代码"></span>`

const markdown = new MarkdownIt({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-', // CSS language prefix for fenced blocks. Can be
  linkify: false, // 自动识别url
  typographer: true,
  quotes: '“”‘’',
  highlight: (str, lang) => {
    if (!hljs) {
      return str
    }
    // fix: ts
    if (lang === 'ts') {
      lang = 'typescript'
    }
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><div class="extra"><span class="lang">${lang}</span>${createCodeCopyIcon(str)}</div><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch {
        return `<pre class="hljs"><div class="extra">${createCodeCopyIcon(str)}</div><code>${markdown.utils.escapeHtml(str)}</code></pre>`
      }
    }

    return `<pre class="hljs"><div class="extra">${createCodeCopyIcon(str)}</div><code>${markdown.utils.escapeHtml(str)}</code></pre>`
  }
})

const uslugify = (s: string) => {
  return uslug(s)
}

markdown.renderer.rules.heading_open = function (tokens, idx, options, _env, self) {
  if (
    tokens[idx].type === 'heading_open' &&
    tokens[idx + 1].type === 'inline' &&
    tokens[idx + 2].type === 'heading_close'
  ) {
    tokens[idx + 1].index = 1
    tokens[idx + 1].children.unshift({
      attrs: [['class', 'heading-inner']],
      block: false,
      children: null,
      content: '',
      hidden: false,
      info: '',
      level: 0,
      map: null,
      markup: '**',
      meta: null,
      nesting: 1,
      tag: 'strong',
      type: 'strong_open'
    })
    tokens[idx + 1].children.push({
      attrs: null,
      block: false,
      children: null,
      content: '',
      hidden: false,
      info: '',
      level: 0,
      map: null,
      markup: '**',
      meta: null,
      nesting: -1,
      tag: 'strong',
      type: 'strong_close'
    })
    return self.renderToken(tokens, idx, options)
  }
}

markdown.renderer.rules.image = function (tokens, idx, options, _env, self) {
  tokens[idx].attrs[1][1] = tokens[idx].content
  tokens[idx].attrPush(['onclick', `window.open('${tokens[idx].attrs[0][1]}', '_blank')`])
  return self.renderToken(tokens, idx, options)
}

// add target="_blank" to all link
const defaultRender = markdown.renderer.rules.link_open || function (tokens, idx, options, _env, self) {
  return self.renderToken(tokens, idx, options)
}
markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const hIndex = tokens[idx].attrIndex('href')
  if (tokens[idx].attrs[hIndex][1].startsWith('#')) {
    return defaultRender(tokens, idx, options, env, self)
  }
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex('target')

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']) // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self)
}

markdown
  // 锚点
  .use(MarkdownItAnchor, {
    // permalink: true,
    // permalinkBefore: true,
    // permalinkSymbol: '<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
    slugify: uslugify
  })
  // TOC目录优化
  .use(MarkdownItTocDoneRight, {
    slugify: uslugify
  })
  // emoji表情
  // .use(MarkdownItEmoji)
  // 上标
  .use(MarkdownItSup)
  // 下标
  .use(MarkdownItSub)
  // dl
  .use(MarkdownItDeflist)
  // <abbr />
  .use(MarkdownItAbbr)
  // 脚注 footnote
  .use(MarkdownItFootnote)
  // 下划线 ins
  .use(MarkdownItIns)
  // 高亮背景 mark
  .use(MarkdownItMark)
  // taskLists
  .use(MarkdownItTaskLists)
  // container
  .use(MarkdownItContainer)
  .use(MarkdownItContainer, 'hljs-left')
  .use(MarkdownItContainer, 'hljs-center')
  .use(MarkdownItContainer, 'hljs-right')
  // 流程图
  // .use(MarkdownItGraphviz)
  // 公式
  // .use(MarkdownItLatex)

export default markdown
