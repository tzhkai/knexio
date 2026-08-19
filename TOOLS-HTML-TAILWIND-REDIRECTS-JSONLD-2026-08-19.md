# 两个工具页的 HTML、Tailwind 风格、301 与 JSON-LD

## 1. 统一页面结构

下面的结构与当前 Workflow Library 的 `Layout`、面包屑、工具工作台和隐私说明相对应。项目当前使用 Tailwind 4，同时保留了一组页面级 CSS token；因此示例中的类名可以直接作为组件结构参考，现有实现中的 `.tool-page` 等类也可替换为同等 Tailwind utilities。

```html
<main class="min-h-screen bg-[#f5f2e9] text-[#20211e]">
  <div class="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 sm:py-24">
    <nav aria-label="Breadcrumb" class="mb-6 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#176b5b]">
      <a href="/" class="hover:underline">Home</a>
      <span aria-hidden="true" class="mx-2 text-[#77786f]">›</span>
      <span class="text-[#6d7168]">Workflow utilities</span>
    </nav>

    <div class="mb-7 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#176b5b]">
      <span aria-hidden="true">✦</span>
      <span>Workflow utility · runs in your browser</span>
    </div>

    <header class="mb-10 max-w-3xl">
      <h1 class="font-serif text-5xl leading-[0.96] tracking-[-0.065em] sm:text-7xl">
        Count the words before you <em class="text-[#176b5b]">prompt.</em>
      </h1>
      <p class="mt-6 max-w-2xl text-base leading-7 text-[#5d625c] sm:text-lg">
        A calm, local word and character counter for shaping AI prompts before you send them.
      </p>
    </header>

    <section class="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)]" aria-label="AI prompt word counter">
      <div class="border border-[#c9c9bb] bg-[#f8f7f0] p-5 shadow-[8px_8px_0_rgba(23,107,91,.08)] sm:p-6">
        <h2 class="font-serif text-3xl font-normal tracking-[-0.035em]">Prompt scratchpad</h2>
        <label for="prompt-counter-input" class="mt-5 block text-[11px] font-extrabold uppercase tracking-[0.1em]">
          Paste or write your prompt
        </label>
        <textarea id="prompt-counter-input" class="mt-2 min-h-[280px] w-full resize-y border border-[#b8b9ab] bg-[#fffef8] p-4 text-sm leading-7 outline-none focus:border-[#176b5b] focus:ring-4 focus:ring-[#176b5b]/10" placeholder="Task: ...&#10;Context: ...&#10;Constraints: ...&#10;Output: ..."></textarea>
        <div class="mt-3 flex flex-wrap gap-2">
          <button type="button" class="inline-flex items-center gap-2 bg-[#176b5b] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[#0f594b] active:scale-[.97]">
            Copy prompt
          </button>
          <button type="button" class="inline-flex items-center gap-2 border border-[#176b5b] px-4 py-3 text-xs font-extrabold text-[#176b5b] transition hover:bg-[#176b5b]/5 active:scale-[.97]">
            Clear
          </button>
        </div>
        <div class="mt-4 grid grid-cols-3 gap-2">
          <div class="border-t border-[#d1d0c2] pt-2"><strong class="font-serif text-3xl font-normal">0</strong><span class="block text-[10px] uppercase tracking-[0.08em] text-[#6c7068]">Words</span></div>
          <div class="border-t border-[#d1d0c2] pt-2"><strong class="font-serif text-3xl font-normal">0</strong><span class="block text-[10px] uppercase tracking-[0.08em] text-[#6c7068]">Characters</span></div>
          <div class="border-t border-[#d1d0c2] pt-2"><strong class="font-serif text-3xl font-normal">0</strong><span class="block text-[10px] uppercase tracking-[0.08em] text-[#6c7068]">Lines</span></div>
        </div>
      </div>

      <aside class="bg-[#103f36] p-5 text-[#f4f0e5] sm:p-6">
        <h2 class="font-serif text-3xl font-normal">Use the count as a check.</h2>
        <div class="mt-7 bg-[#f8f7f0] p-5 text-[#28352e]">
          <p class="font-bold">Brief-first check</p>
          <ul class="mt-3 list-disc space-y-1 pl-5 text-sm leading-7">
            <li>Is the task specific?</li>
            <li>Is the audience named?</li>
            <li>Are constraints visible?</li>
            <li>Can the output be reviewed?</li>
          </ul>
        </div>
      </aside>
    </section>

    <section class="mt-14 grid gap-8 border-t border-[#20211e] pt-4 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <h2 class="font-serif text-4xl font-normal tracking-[-0.035em]">Why this belongs in the workflow.</h2>
        <p class="mt-3 leading-7 text-[#5d625c]">Small tools are useful when they make a review step clearer, not when they promise to replace judgment.</p>
        <p class="mt-4 bg-[#e9eee8] p-4 text-[11px] leading-5 text-[#536259]"><strong class="text-[#176b5b]">Privacy note.</strong> This version processes text locally and does not upload it to a server.</p>
      </div>
      <nav aria-label="Related guides" class="grid content-start">
        <a href="/guides/brief-first-prompt-pattern/" class="flex justify-between border-b border-[#cbcbbe] py-3 text-sm font-bold hover:text-[#176b5b]">Use the brief-first prompt pattern <span aria-hidden="true">↗</span></a>
        <a href="/guides/clear-project-update-prompt/" class="flex justify-between border-b border-[#cbcbbe] py-3 text-sm font-bold hover:text-[#176b5b]">Draft a clearer project update <span aria-hidden="true">↗</span></a>
      </nav>
    </section>
  </div>
</main>
```

## 2. Markdown Preview 的工作台替换部分

Markdown Preview 共用上面的面包屑、标题、隐私说明和相关指南结构，只需要替换工作台区域。预览区必须使用经过转义的白名单 Markdown 渲染器；不要把用户输入直接交给 `dangerouslySetInnerHTML`。

```html
<section class="grid gap-5 lg:grid-cols-2" aria-label="Markdown preview">
  <div class="border border-[#c9c9bb] bg-[#f8f7f0] p-5 shadow-[8px_8px_0_rgba(23,107,91,.08)] sm:p-6">
    <h2 class="font-serif text-3xl font-normal tracking-[-0.035em]">Markdown input</h2>
    <label for="markdown-preview-input" class="mt-5 block text-[11px] font-extrabold uppercase tracking-[0.1em]">Write or paste Markdown</label>
    <textarea id="markdown-preview-input" class="mt-2 min-h-[280px] w-full resize-y border border-[#b8b9ab] bg-[#fffef8] p-4 font-mono text-sm leading-7 outline-none focus:border-[#176b5b] focus:ring-4 focus:ring-[#176b5b]/10"></textarea>
    <div class="mt-3 flex flex-wrap gap-2">
      <button type="button" class="bg-[#176b5b] px-4 py-3 text-xs font-extrabold text-white active:scale-[.97]">Copy Markdown</button>
      <button type="button" class="border border-[#176b5b] px-4 py-3 text-xs font-extrabold text-[#176b5b] active:scale-[.97]">Clear</button>
    </div>
    <p class="mt-3 text-[11px] leading-5 text-[#7a8178]">Supports headings, emphasis, lists, quotes, inline code, and fenced code blocks.</p>
  </div>

  <div class="bg-[#103f36] p-5 text-[#f4f0e5] sm:p-6">
    <h2 class="font-serif text-3xl font-normal">Rendered preview</h2>
    <article id="markdown-preview-output" class="mt-5 min-h-[280px] overflow-auto bg-[#f8f7f0] p-5 text-[#28352e]">
      <!-- Render only escaped, whitelisted Markdown elements here. -->
    </article>
    <p class="mt-3 text-[11px] leading-5 text-[#c9d4cb]">Links and raw HTML are intentionally not interpreted in this local preview.</p>
  </div>
</section>
```

## 3. Cloudflare Redirect Rules 表达式

这两条规则只处理旧静态文件入口。规范目录 URL 本身已经由新应用直接提供，不应创建自重定向。

### AI Prompt Word Counter

```text
(http.host eq "knexio.xyz" and http.request.uri.path eq "/tools/ai-prompt-word-counter/index.html")
```

Redirect action 设置为 **Static URL**：

```text
https://knexio.xyz/tools/ai-prompt-word-counter/
```

选择 **301 - Permanent Redirect**，并打开 **Preserve query string**。

### Markdown Preview

```text
(http.host eq "knexio.xyz" and http.request.uri.path eq "/tools/markdown-preview/index.html")
```

Redirect action 设置为 **Static URL**：

```text
https://knexio.xyz/tools/markdown-preview/
```

同样选择 **301 - Permanent Redirect**，并打开 **Preserve query string**。

验证命令：

```bash
curl -sSIL "https://knexio.xyz/tools/ai-prompt-word-counter/index.html?source=legacy-test"
curl -sSIL "https://knexio.xyz/tools/markdown-preview/index.html?source=legacy-test"
curl -sSIL "https://knexio.xyz/tools/ai-prompt-word-counter/"
curl -sSIL "https://knexio.xyz/tools/markdown-preview/"
```

预期结果是旧入口各返回一次 301，随后新目录 URL 返回 200。若 Cloudflare 控制台使用 Wildcard pattern 而不是表达式编辑器，也可分别使用：

```text
https://knexio.xyz/tools/ai-prompt-word-counter/index.html
→ https://knexio.xyz/tools/ai-prompt-word-counter/
```

```text
https://knexio.xyz/tools/markdown-preview/index.html
→ https://knexio.xyz/tools/markdown-preview/
```

## 4. AI Prompt Word Counter 的 JSON-LD

将以下 JSON-LD 放入该页面的 `<head>`；项目当前的 `SeoMeta` 已经会在运行时生成同等结构，实际接入时不要重复输出两份相同的 `WebApplication` 节点。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://knexio.xyz/tools/ai-prompt-word-counter/#application",
  "name": "AI Prompt Word Counter",
  "url": "https://knexio.xyz/tools/ai-prompt-word-counter/",
  "description": "Count words, characters, and lines in an AI prompt locally in your browser before you send it.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires a modern browser with JavaScript enabled",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Workflow Library",
    "url": "https://knexio.xyz/"
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Workflow Library",
    "url": "https://knexio.xyz/"
  }
}
</script>
```

## 5. Markdown Preview 的 JSON-LD

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://knexio.xyz/tools/markdown-preview/#application",
  "name": "Markdown Preview",
  "url": "https://knexio.xyz/tools/markdown-preview/",
  "description": "Preview Markdown notes, prompts, and first drafts locally in your browser with a simple, safe writing surface.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires a modern browser with JavaScript enabled",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Workflow Library",
    "url": "https://knexio.xyz/"
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Workflow Library",
    "url": "https://knexio.xyz/"
  }
}
</script>
```

## 6. 接入注意事项

`WebApplication` 结构化数据可以帮助搜索引擎理解页面是一个可使用的网页应用，但它不保证获得特殊搜索结果展现，也不应添加不存在的评分、评论、下载量或用户数量。两个工具都没有用户评价，因此不应添加 `AggregateRating` 或 `Review`。

当前项目已经将两个页面加入 `generate-route-meta.ts`、`generate-sitemap.mjs` 和运行时 `SeoMeta`。因此，上述代码主要用于复用、审阅和 Cloudflare 配置；不需要再手工把同一 JSON-LD 复制到多个地方。

### 参考资料

[1]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data "Google Search Central：结构化数据简介"
[2]: https://schema.org/WebApplication "Schema.org：WebApplication"
[3]: https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/ "Cloudflare：创建 Single Redirects"
