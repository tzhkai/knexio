# Workflow Library：Cloudflare Pages 部署准备指南

**适用项目：** Workflow Library 静态 React/Vite 站点。  
**编写日期：** 2026-08-15。  
**执行边界：** 本文为发布准备与用户操作指南。请由域名和 Cloudflare 账户持有人在 Cloudflare 控制台完成外部登录、仓库连接、域名关联和最终发布确认。

> 与内置托管相比，Cloudflare Pages 可以承载本项目的静态产物，但你需要自行维护 Git、Cloudflare 项目、DNS、环境变量和部署排错。若希望减少外部平台配置，内置托管及其自定义域名功能仍是更直接的替代方案。

## 1. 当前项目的 Cloudflare Pages 兼容性

| 项目项 | 当前配置 | Cloudflare Pages 设置 |
|---|---|---|
| 框架 | React + Vite 单页应用 | 选择 **React (Vite)** 预设，或使用自定义构建设置。 |
| 包管理器 | pnpm | 生产构建命令使用 `pnpm build:cloudflare`；该命令先生成 sitemap/robots，再构建静态站点。 |
| 站点构建产物 | `dist/public` | **Build output directory：`dist/public`**。不要填 Cloudflare 默认 Vite 示例中的 `dist`，因为本项目将服务器兼容产物与前端静态文件分开。 |
| 页面路由 | Wouter 客户端路由 | 无顶层 `404.html` 时，Cloudflare Pages 默认以 SPA 方式回退至根入口，当前项目无需额外 `/* /index.html 200` 规则。[1] |
| 静态 SEO 文件 | `robots.txt`、`sitemap.xml`、站点清单 | 构建后位于 `dist/public/`，随静态站点一并发布。 |

Cloudflare 的 React/Vite 预设使用构建命令和输出目录来决定上传内容；本项目的实际 Vite 输出路径是 `dist/public`，应优先采用这一项目特定路径。[2]

## 2. 发布前必须完成的项目内准备

### 2.1 生成正式 sitemap 与 robots.txt

在绑定并确定唯一正式 HTTPS 域名后，于项目根目录运行：

```bash
SITE_URL=https://www.example.com pnpm build:cloudflare
```

请把 `https://www.example.com` 换为最终 canonical 域名。该命令会生成：

```text
client/public/sitemap.xml
client/public/robots.txt
```

构建完成后确认以下文件存在：

```text
dist/public/sitemap.xml
dist/public/robots.txt
dist/public/index.html
```

不要在最终域名确定前把临时 `pages.dev`、预览 URL 或旧域名写入 sitemap。完整 URL 规划请参阅项目内的 `SEARCH-CONSOLE-SITEMAP-ROBOTS-PLAN.md`。

### 2.2 不要新增宽泛 SPA rewrite

本项目的构建产物不应额外加入 `_redirects` 中的 `/* /index.html 200` 规则。Cloudflare Pages 文档指出，若项目没有顶层 `404.html`，Pages 会将其作为 SPA 处理并把未知路径回退到根入口；当前项目正使用这种机制，让 Wouter 路由显示对应页面或站内 404。[1]

如果以后增加真实静态 `404.html`，Pages 的行为会改变。届时应重新验证深层路径（例如 `/guides/customer-feedback-theme-map`）是否仍正确由客户端路由处理，再决定是否需要最小化的 `_redirects` 配置。

## 3. Cloudflare Pages 控制台发布步骤

| 顺序 | Cloudflare 操作 | 本项目对应值 |
|---|---|---|
| 1 | 将代码推送至你控制的 GitHub 或 GitLab 仓库 | 包含 `package.json`、`pnpm-lock.yaml`、`client/`、`scripts/`。 |
| 2 | 打开 **Workers & Pages**，创建 Pages 项目并连接仓库 | 选择生产分支，例如 `main`。 |
| 3 | 选择构建设置 | Framework preset：React (Vite)；Build command：`pnpm build:cloudflare`；Build output directory：`dist/public`；Root directory：仓库根目录。 |
| 4 | 设置 Node 运行时 | 使用与本项目一致的 Node 22 系列；如控制台需要，可添加 `NODE_VERSION=22`。 |
| 5 | 添加必要环境变量 | 设置 `SITE_URL=https://www.example.com`（换成唯一正式 HTTPS 域名）。这是构建 sitemap/robots 所必需的公开构建变量；不要把敏感密钥放入前端变量。当前项目没有必需的外部运行时密钥。 |
| 6 | 触发首次部署 | 打开 `*.pages.dev` 预览，检查首页和深层文章链接。 |
| 7 | 添加自定义域名 | 在 Pages 项目中进入 **Custom domains**，先完成 “Set up a domain” 流程，再按指引配置 DNS。 |
| 8 | 验证生成文件并重新部署 | `pnpm build:cloudflare` 会使用 `SITE_URL` 生成 `sitemap.xml` 与 `robots.txt`；确认其为正式域名后推送并触发新构建。 |

Cloudflare 要求先在 Pages 项目中关联自定义域名；仅手动添加指向 `pages.dev` 的 CNAME 而不在 Pages 控制台关联，可能导致域名无法正确解析。根域名通常要求将域名作为 Cloudflare zone 并使用 Cloudflare nameservers；子域名可通过 CNAME 指向 Pages 子域名，具体以控制台指引为准。[3]

## 4. DNS 与旧 AdSense 域名迁移注意事项

如果使用旧项目域名，先保留旧主机的备份，并清理旧站中不再适用的测试页、过期页面、广告代码及不一致政策页。仅当旧 URL 与新页面主题确实对应时才设置 301；不相关的旧 URL 不要批量重定向到首页。

选择一个唯一 canonical 版本，例如：

```text
https://www.example.com
```

随后确保以下位置完全一致：Cloudflare 自定义域名、Cloudflare DNS、sitemap 中的 URL、robots 的 `Sitemap:` 行、页面 canonical、Search Console 属性和后续 AdSense 配置。若使用根域名，按 Cloudflare 指引将该域名添加为 zone 并更新 nameserver；若使用子域名，按 Pages 控制台给出的 CNAME 记录配置。[3]

## 5. 部署后验证清单

- [ ] 首页 `https://www.example.com/` 返回 200，页面资源可加载。
- [ ] 至少三条深层 SPA 路径直接刷新仍能渲染：`/guides`、`/guides/customer-feedback-theme-map`、`/series`。
- [ ] 随机错误路径由客户端显示站内 404 引导页，而不是 Cloudflare 通用错误页。
- [ ] `https://www.example.com/sitemap.xml` 返回 XML，且 URL 使用正式 canonical 域名。
- [ ] `https://www.example.com/robots.txt` 返回纯文本，并准确引用正式 sitemap URL。
- [ ] 自定义域名 HTTPS 证书已生效，没有 mixed content 或重定向循环。
- [ ] Cookie 横幅、隐私页、服务条款、联系页中的运营主体和数据服务描述已改为真实上线版本。
- [ ] 在 Google Search Console 验证正式资源并提交 sitemap。

## 6. 缓存与后续更新

Cloudflare Pages 已为静态资产提供缓存和压缩。Cloudflare 建议一般不要叠加宽泛的自定义缓存规则，因为这可能导致部署后出现陈旧资源，或干扰 Pages redirects/Functions；本项目初次发布时应保留默认缓存行为。[1]

每次新增文章或修改 SEO 路由时，按照以下顺序发布：更新内容与内部链接 → 使用正式域名运行 `pnpm sitemap` → 提交代码 → 等待 Pages 构建完成 → 打开 sitemap 和代表路径验证 → 在 Search Console 关注抓取与索引状态。若部署后仍看到陈旧静态资源，再考虑按 Cloudflare 指引清除缓存，而不是预先添加全站 Cache Rule。[1]

## 7. 参考资料

[1] Cloudflare, [Serving Pages: SPA rendering and caching](https://developers.cloudflare.com/pages/configuration/serving-pages/)

[2] Cloudflare, [Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)

[3] Cloudflare, [Custom domains for Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/)

[4] Cloudflare, [Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/)
