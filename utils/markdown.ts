// @ts-nocheck
import uslug from 'uslug'
import hljs from 'highlight.js'

import markdown from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
import MarkdownItSup from 'markdown-it-sup'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItAbbr from 'markdown-it-abbr'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItIns from 'markdown-it-ins'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItTaskLists from 'markdown-it-task-lists'
import MarkdownItContainer from 'markdown-it-container'



const md = new markdown({
  html: true,
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-', // CSS language prefix for fenced blocks. Can be
  linkify: false, // 自动识别url
  typographer: true,
  quotes: '“”‘’',
  highlight: (code, lang) => {
    let html = code
    try {
      if (!hljs) return html
  
      let formatLang = lang
  
      if (/ts/i.test(lang)) {
        formatLang = 'typescript'
      } else if (/vue/.test(lang)) {
        formatLang = 'html'
      }
  
      if (formatLang && hljs.getLanguage(formatLang)) {
        try {
          html = hljs.highlight(code, { language: formatLang, ignoreIllegals: true }).value
        } catch {
          html = md.utils.escapeHtml(code)
        }
      } else {
        html = md.utils.escapeHtml(code)
      }
  
      return `<pre>` +
                `<details open>` +
                  `<summary>` +
                    `<button class="btn-collapse">` +
                      `<svg width=1em height=1em><use xlink:href="#icon-down" width=1em height=1em></svg>` +
                    `</button>` +
                    `<div class="hljs-code-header">` +
                      `<span class="hljs-code-lang">${lang || 'plain-text'}</span>` +
                      `<button class="hljs-code-copy">` +
                        `<span>copied</span>` +
                        `<svg width=1em height=1em><use xlink:href="#icon-copy" width=1em height=1em></svg>` +
                      `</button>` +
                    `</div>` +
                  `</summary>` +
                  `<code class="hljs">${html}</code>` +
                `</details>` +
              `</pre>`
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('parse code error: ', err)
      return html
    }
  }
})

const uslugify = (s: string) => {
  return uslug(s)
}

// add target="_blank" to all link
const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, _env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
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

md
  // 锚点
  .use(MarkdownItAnchor, {
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

export default md
