# Workflow Library：旧 GitHub 仓库迁移方案

**目标仓库：** `tzhkai/knexio`  
**审计日期：** 2026-08-15  
**建议：** 可继续使用该仓库和既有 Cloudflare Pages 项目，但应以一次可回退的提交**完整替换旧站代码**，而不是将新站文件与旧静态站文件混合。

## 审计结论

旧仓库当前默认分支为 `main`，包含约 308 个受追踪文件及 14 个旧内容目录。它不是可直接兼容新站的 Vite 项目：现有站点是静态 HTML/CSS/JS 结构，含工具、游戏、博客、财经等与 Workflow Library 定位无关的页面。将两套文件并存会保留大量过期 URL、sitemap、重定向和主题不一致内容，不利于新的内容聚焦与搜索索引管理。

| 项目 | 已发现状态 | 迁移决定 |
|---|---|---|
| 默认分支 | `main` | 保留，作为新站生产分支。 |
| Cloudflare Pages | `deploy.yml` 在 `main` 推送后执行 `wrangler pages deploy . --project-name=knexio-site`。 | 保留项目与仓库 secret，但将工作流改为构建后部署 `dist/public`。 [1] |
| 自定义域名 | `CNAME` 内容为 `knexio.xyz`。 | 保留 Cloudflare Pages 控制台里的 `knexio.xyz` 绑定；新代码仓库中不保留旧 `CNAME` 静态文件。 [2] |
| 旧内容 | 工具、游戏、PDF/博客、金融、旧政策页与静态 sitemap 目录。 | 从生产分支移除，不与新站混合。 |
| 重定向 | `_redirects` 包含大量旧工具、游戏和博客路径的 301。 | 不直接保留；仅为确实存在外链/搜索流量且主题匹配的旧 URL 单独评估。 [3] |
| 缓存/安全头 | `_headers` 针对旧静态文件与 sitemap 设计。 | 用新项目兼容的最小安全头策略重建，不直接复制。 [4] |
| 旧自动化 | 广告游戏审计脚本、对旧站 URL 的 Cloudflare purge workflow。 | 移除或重写；它们依赖本次不再保留的路径与脚本。 [1] |

## 应保留的资产

应保留 Git 仓库自身的提交历史、现有 Cloudflare Pages 项目 `knexio-site`、GitHub 仓库中可能仍有效的 `CLOUDFLARE_API_TOKEN` secret、Cloudflare 中的 `knexio.xyz` 自定义域名绑定以及域名/DNS 设置。这些项目不会因为一次普通 Git 提交被清除。

> 旧仓库的 README 虽写有 GitHub Pages，但实际的 `deploy.yml` 使用 Wrangler 直接发布到 Cloudflare Pages。因此此次迁移应以现有 Cloudflare Pages 自动化为基础，而不是配置 GitHub Pages。[1] [5]

## 应替换或移除的文件

迁移提交将把旧站的以下内容从 `main` 分支移除：`about/`、`ai-tools/`、`blogs/`、`business/`、`contact/`、`editorial-standards/`、`finance/`、`games/`、`guides/`、`privacy/`、`terms/`、`tools/`、旧 `index.html`、旧 sitemap 文件、`CNAME`、`ads.txt`、`ga-analytics.js`、`cookie-consent.js`、`knexio-bundle.js`、`shared.css`、旧 `_redirects`、旧 `_headers`，以及所有旧站专属脚本和工作流。

新仓库内容将由当前 Workflow Library 的 React/Vite 项目组成，包括 `client/`、`scripts/generate-sitemap.mjs`、`package.json`、`pnpm-lock.yaml`、`vite.config.ts`、网站政策/发布文档和新的 Cloudflare 构建工作流。

## 新的自动发布工作流

新工作流会在向 `main` 推送时执行如下逻辑：使用 Node 22 和 pnpm 安装锁定依赖；以正式 canonical 域名作为 `SITE_URL` 执行 `pnpm build:cloudflare`；将 `dist/public` 部署到既有 Cloudflare Pages 项目 `knexio-site`。现有的 GitHub `CLOUDFLARE_API_TOKEN` secret 应继续作为发布凭据；如果该 secret 已失效，GitHub Actions 会失败，但新站代码仍会安全保留在仓库中。

建议 canonical 域名确定为：

```text
https://knexio.xyz
```

这会使新的 sitemap、robots、canonical 和 Search Console 提交路径保持一致。仅当你明确改用 `www.knexio.xyz` 时，才应把 `SITE_URL` 改为该版本并同步修改 Cloudflare 重定向。

## 推送前必须获得的确认

迁移前需要用户明确确认以下事项：

1. `main` 分支可被一次迁移提交完整替换，新提交会保留 Git 历史而非抹除历史。
2. 继续使用 Cloudflare Pages 项目 `knexio-site` 和域名 `knexio.xyz`。
3. `https://knexio.xyz` 是新的唯一 canonical 域名。
4. GitHub token 仅具备该仓库的 **Contents: Read and write** 权限；不需要密码，也不需要 Cloudflare token。

## 发布后核验

推送成功后，应检查 GitHub Actions 的构建日志，再验证 `https://knexio.xyz/`、`/guides`、`/guides/customer-feedback-theme-map`、`/sitemap.xml` 与 `/robots.txt`。上线前还须把站点上的发布者身份、联系邮箱、作者/审校资料等明确占位内容替换成真实运营信息，之后再提交 Search Console 和 AdSense。

## 迁移执行结果

迁移已在 `main` 完成，旧站内容由 Workflow Library 项目替换。GitHub 提交 `ce1d635e` 完成完整内容迁移，随后提交 `4230004e` 修复工作流的 pnpm 版本冲突。GitHub Actions 运行 `31859960238` 已成功完成 TypeScript 检查、正式 sitemap/robots 生成和 Cloudflare Pages 部署。

生产域名已实测：`https://knexio.xyz/` 正确显示 Workflow Library 首页及本地 `/images/` 静态资源；`https://knexio.xyz/guides/customer-feedback-theme-map` 可直接加载完整文章，确认 Cloudflare Pages 的 SPA 深层路由回退有效。

## References

[1] [Existing deploy workflow](https://raw.githubusercontent.com/tzhkai/knexio/main/.github/workflows/deploy.yml)

[2] [Existing CNAME file](https://raw.githubusercontent.com/tzhkai/knexio/main/CNAME)

[3] [Existing redirect rules](https://raw.githubusercontent.com/tzhkai/knexio/main/_redirects)

[4] [Existing header rules](https://raw.githubusercontent.com/tzhkai/knexio/main/_headers)

[5] [Existing repository README](https://raw.githubusercontent.com/tzhkai/knexio/main/README.md)
