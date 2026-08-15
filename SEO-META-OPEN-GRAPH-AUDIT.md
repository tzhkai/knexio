# Workflow Library：Meta 与 Open Graph 审计

**审计日期：** 2026-08-15  
**正式域名：** `https://knexio.xyz`  
**范围：** 首页、内容库、12 篇指南、4 个专题、学习路径、关于/联系/编辑政策/隐私/条款以及站内 404。

## 当前状态

站点已通过 `SeoMeta` 组件在客户端为各页面设置标题、description、robots、canonical、Open Graph 基础字段、Twitter 卡片和 JSON-LD。文章页同时提供 `Article` 与面包屑结构化数据，专题与内容库提供 `CollectionPage`/`ItemList`。[1]

不过，浏览器端 `useEffect` 生成的标签依赖 JavaScript 执行。为了使搜索爬虫和社交抓取器在不执行客户端脚本时也能获得页面专属标题、描述、canonical 与预览图，本次优化会在生产构建后为所有公开路由生成静态 HTML 入口。运行时组件仍保留，以支持客户端内页切换。

| 审计项 | 当前发现 | 优化方向 |
|---|---|---|
| 默认 HTML 头部 | 仅覆盖首页级 description 和部分基础 Open Graph 字段。 | 补齐 canonical、Open Graph URL/site name/image/alt、Twitter 图像与明确的 robots 默认值。 |
| 动态路由 | 文章和专题的标签由客户端设置。 | 在构建后为每条公开路由输出具备独立 head 的 `index.html`。 |
| 分享图片 | 个别页面不传 `image` 时可能缺少预览图；客户端路由切换还可能保留上页图像字段。 | 使用站点主视觉作为稳定后备图；为页面图像提供 alt；页面无图时清除或替换旧字段。 |
| 文章元数据 | 已有 Article JSON-LD，但 Open Graph 没有文章发布日期、更新日期、栏目和关键词标签。 | 添加 `article:published_time`、`article:modified_time`、`article:section` 与 `article:tag`。 |
| 通用站点识别 | 缺少 `og:site_name`、`og:locale` 与 Twitter 图像替代文本。 | 为所有索引页面统一输出这些字段。 |
| 404 与无效动态内容 | 运行时声明 `noindex`。 | 预渲染站内 404 并维持 `noindex,follow`。 |

## 优化原则

标题继续描述真实任务或页面意图，不用关键词堆砌；description 概括读者能完成的工作、提供的约束或检查机制；每一页拥有自指 canonical；每条分享预览使用正式域名的绝对图像 URL。所有页面将维持英文内容语言、`en_US` Open Graph locale 和 `Workflow Library` 的一致品牌标识。

## 预期产物

构建完成后，`dist/public/` 的根入口和每个公开路径目录都会包含对应 Meta 标签。Cloudflare Pages 可直接为路径提供静态入口，客户端路由仍负责交互和站内导航。Sitemap 中的 24 个规范 URL 将获得可抓取的特定 title、description、canonical 和社交预览字段。

## 实施与验证结果

已增强 `SeoMeta` 组件，使其为运行时路由切换同步 description、robots、Googlebot、canonical、Open Graph、Twitter 和文章专属字段。所有无插图页面使用站点主视觉作为稳定的社交分享后备图，避免路由切换后保留错误或缺失的预览图；文章页增加发布时间、更新时间、栏目及每个主题词对应的 `article:tag`。

已新增构建后路由 Meta 生成器。它基于内容数据为 25 个 HTML 入口输出专属 head：24 个 sitemap 规范 URL 加上不编入索引的 `/404`。验证通过 TypeScript 检查、正式 `SITE_URL=https://knexio.xyz pnpm build:cloudflare` 构建，以及 15 条代表性路由的 description、canonical、Open Graph、Twitter 与文章/404 专属字段检测。首页、代表文章和专题页的浏览器渲染亦未出现可见回归。

## References

[1] [现有 SeoMeta 组件](client/src/components/SeoMeta.tsx)
