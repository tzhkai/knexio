# Cloudflare Worker 路径迁移与 persona-pop 归档评估

**核查对象：** `affiliate-link-injector`、`persona-pop`

**核查结论：** affiliate Worker 仍在 markdownmaster.site 生产链路中提供多项职责，不能直接删除；persona-pop 当前没有自定义域、没有发现 GitHub 或当前项目引用，Cloudflare Pages Analytics 在过去 24 小时和过去 30 天均未显示可用数据，但 Web Analytics 未启用，因此无法证明其历史上从未有外部流量。建议先保留备份，再执行可恢复的归档/停用，而不是永久删除。

## 一、affiliate Worker 的实际目标路径

Worker 当前绑定 `markdownmaster.site/*`，源站为 `https://tool-markdown.pages.dev`。它不是单纯的联盟按钮脚本，而是同时承担规范化、旧 URL 重定向、站点发现文件和源站代理职责。

| 功能 | 当前匹配范围 | 当前行为 | 风险判断 |
|---|---|---|---|
| HTTP 到 HTTPS | 所有 HTTP 请求 | 301 到同路径 HTTPS | 应保留，但可迁移到 Cloudflare SSL/TLS 或 Redirect Rules |
| www 到非 www | 所有 `www.*` 请求 | 301 到 `https://markdownmaster.site` | 应保留，避免规范域分裂 |
| 旧博客 slug | 8 个明确旧路径 | 301 到新博客路径 | 必须保留，否则可能损失旧链接流量 |
| `/pricing/` | 1 个明确路径 | 301 到 `/editor/` | 需确认业务意图，若旧页面仍被外部引用则保留 |
| 尾部斜杠 | 所有无扩展名且非根路径 URL | 301 添加 `/` | 应保留，但应与 Pages/Astro 的规范 URL 规则统一 |
| `/robots.txt` | 单一路径 | Worker 直接返回 robots 文本 | 应迁移为源站静态文件或保留 Worker 响应 |
| `/sitemap.xml` | 单一路径 | 301 到 `/sitemap-index.xml` | 应保留，避免旧 sitemap 入口失效 |
| 静态资源 | 扩展名资源 | 直接代理，不注入 HTML | 必须保留，避免 JS、CSS、字体和图片损坏 |
| HTML 页面 | 未命中上述分支的 HTML | 读取 D1 `link_templates`，注入固定联盟按钮 | 仍在生产使用，不可直接移除 |

Worker 的 HTML 注入只发生在 `content-type` 包含 `text/html` 且响应正文包含 `</body>` 时。它从 D1 `saas-sites-db` 的 `link_templates` 表读取 `site_id = 'tool-markdown'` 的联盟链接；当前线上主页和内容页都能检测到注入按钮，说明该功能仍实际生效。

## 二、建议的迁移顺序

迁移不应一次性删除 Worker，而应先把各项职责拆开并逐项回归。最安全的顺序如下：

| 阶段 | 迁移目标 | 建议实现 | 验证标准 |
|---|---|---|---|
| 1 | 固化页面与资源行为 | 先确认 `tool-markdown.pages.dev` 当前产物、规范 URL、静态资源和旧 slug 列表 | 主页、编辑器、博客旧链接、sitemap 和 robots 均有基线响应 |
| 2 | 迁移规范重定向 | 将 HTTP/HTTPS、www、尾部斜杠和明确旧 slug 分别迁移到 Cloudflare Redirect Rules 或 Pages/源站配置 | 每个旧 URL 仍返回单次 301，目标 URL 返回 200 |
| 3 | 迁移 robots 与 sitemap | 将 Worker 直接生成的 `/robots.txt` 和 `/sitemap.xml` 变成源站静态文件或 Pages 路由 | 内容、状态码、canonical 和 sitemap index 保持一致 |
| 4 | 保留联盟注入 | 暂时保留 Worker 的 HTML 注入和 D1 绑定；如要迁移，先在源站构建阶段生成固定配置或在应用层注入 | HTML 页面按钮、外链 `target`、`rel` 和移动端显示一致 |
| 5 | 收窄路由 | 只有在前四阶段稳定后，才把 `markdownmaster.site/*` 改为必要的 HTML 路径集合；静态资源应由 Pages 直接提供 | 所有页面与资源回归通过，Worker 请求量和错误率无异常 |
| 6 | 最终停用 | 观察至少一个完整抓取周期和业务周期，再停用旧 Worker 路由 | 无 404、无重定向链、无联盟按钮缺失、无 Search Console 异常 |

不建议现在把路由直接收窄到 `/blog/*`。当前 Worker 同时负责全站规范化、robots、sitemap、旧 URL 和 HTML 注入；贸然收窄会导致 `/editor/`、专题页、旧链接或站点发现文件行为改变。

## 三、persona-pop 的证据

| 证据项 | 当前结果 | 解释 |
|---|---|---|
| 自定义域 | 未发现 | 项目只有 `persona-pop-2h2.pages.dev` |
| 页面访问 | pages.dev 返回 HTTP 200 | 项目仍存在且可以访问，不代表有真实用户流量 |
| Cloudflare Analytics 过去 24 小时 | 请求成功 0、错误 0、子请求 0 | 未见近期生产请求 |
| Cloudflare Analytics 过去 30 天 | 页面显示“此时间范围内没有可用数据” | 未显示可计量数据；不是访问者来源报告 |
| Web Analytics | 未启用 | 无法查看访客、来源、国家或引用页 |
| 最近部署 | 约 3 个月前 | 没有近期持续发布迹象 |
| GitHub/当前项目引用 | 未找到 | 没有发现当前代码或仓库依赖它 |

这些证据足以支持“当前没有明显活跃依赖”，但不能严格证明过去没有外部访问，因为 Web Analytics 未启用，且 Pages Analytics 没有提供历史访客来源信息。归档应采用可恢复操作，并在归档前保留项目名称、生产 URL、最近部署信息和当前备份。

## 四、建议的 persona-pop 处置

建议先执行 Cloudflare Pages 提供的归档或停用自动部署动作；如果控制台只有“删除项目”而没有真正的归档功能，则不要直接点击删除，应先导出或保留部署信息，并再次确认。归档后应检查 `persona-pop-2h2.pages.dev` 的响应变化、Workers/Pages 项目清单是否移除、是否存在 DNS 或自定义域残留，以及 GitHub Actions 或其他项目是否产生失败请求。

当前没有执行 persona-pop 归档，因为 Cloudflare Analytics 未启用 Web Analytics，30 天报告显示无可用数据但不是完整的历史外部访问证明。若用户接受“无近期活跃流量 + 无自定义域 + 无代码引用”作为归档标准，可以下一步执行可恢复归档；若要求严格证明历史上无外部流量，则需要用户提供该项目的访问日志、源仓库流量或更长周期的第三方统计数据。

## 五、明确结论

affiliate-link-injector **暂不应删除或直接收窄**。它当前至少承担 301 重定向、规范化、robots、sitemap、Pages 代理和 HTML 联盟按钮注入六类职责。合理方案是先拆分职责，再逐项迁移，最后才停用 Worker。

persona-pop **具备归档条件，但目前不具备“严格证明从未有外部流量”的条件**。当前最稳妥的动作是保留备份后执行可恢复归档；不建议永久删除。
