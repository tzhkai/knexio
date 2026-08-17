# 新上线指南 SEO 基础审计

检查日期：2026-08-17。生产域名：`https://knexio.xyz`。

## Evidence Matrix

URL：`/guides/evidence-matrix-from-source-notes/`

生产页面标题为 `Build an evidence matrix from source notes before making a decision | Workflow Library`；页面摘要为“Turn scattered claims into a reviewable matrix that shows support, gaps, confidence, and the next verification step.”。浏览器真实渲染显示一个清晰的 H1“Build an evidence matrix from source notes before making a decision”，并有目录、起始提示词、多个 H2 工作步骤、正文段落、人审检查和编辑归属模块。页面导航链接到 Research & decisions hub，内部相关指南和上一篇/下一篇链接正常。

## Writing

URL：`/guides/clear-project-update-prompt/`

生产页面标题为 `Draft a clear project update without sounding robotic | Workflow Library`；页面摘要为“Transform raw progress notes into an update with context, decisions, risks, and one specific ask.”。浏览器真实渲染显示清晰的 H1“Draft a clear project update without sounding robotic”，目录与 H2 结构覆盖输入准备、起始提示词、工作步骤、读者问题、状态语言、单一请求和人审检查；页面链接到 Writing & updates hub，并有相关指南和顺序阅读链接。

## 代码与生产静态检查

静态构建为成功。三篇新指南均生成独立静态 HTML，包含差异化 title、meta description、canonical、Open Graph/Twitter 元数据、Article JSON-LD、发布日期和修改日期。`GuideDetail.tsx` 在运行时输出单个 H1、多个语义 H2、目录锚点和 Article/BreadcrumbList 结构化数据。

生产 sitemap 由 `scripts/generate-sitemap.mjs` 生成：`sitemap_index.xml` 包含 3 个子 sitemap；页面 sitemap 8 个 URL，指南 sitemap 16 个 URL，专题 sitemap 4 个 URL，共 28 个规范 URL。robots.txt 指向 `https://knexio.xyz/sitemap_index.xml`，并仅禁止 `/404`。

## 301 映射判断

抽查的旧 Gemini、ChatGPT、Steam、Slack、旧博客和游戏 URL 均返回真实 404。当前新站没有与这些旧页面内容足够等价的替代页面，因此不应把它们批量 301 到首页、`/guides/` 或不相关的新指南；这样会形成弱相关重定向，不能可靠保留权重。当前安全做法是保留真实 404，只有发现一对一主题等价的新页面时才增加精确 301。


## Search Console sitemap 状态

2026-08-17 在已登录的 `sc-domain:knexio.xyz` 资源中核验到 `https://knexio.xyz/sitemap_index.xml` 已提交，类型为“站点地图索引”，状态为“成功”；上次读取时间显示为 2026-08-15，已提交网址数为 82，已发现网页为 82，已发现视频为 0。因此本次不重复提交，避免制造无必要的重复记录。生产端 `sitemap_index.xml`、三个子 sitemap 和 `robots.txt` 均返回 HTTP 200，sitemap 索引指向三个子 sitemap，当前生产 sitemap 配置是可抓取的。
