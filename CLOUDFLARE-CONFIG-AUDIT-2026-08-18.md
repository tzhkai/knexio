# Cloudflare 配置审计记录（2026-08-18）

本轮为只读审计，未修改或删除任何 Cloudflare 配置。当前账户名称显示为 Knexio，域名总览中确认有两个 Websites：`knexio.xyz` 与 `markdownmaster.site`，两者均为 Free 计划。账户最近访问和项目入口还显示 `affiliate-link-injector` Worker，以及 Web Analytics 和账户分析模块。

## knexio.xyz

DNS 页面显示共 9 条记录。根域名 CNAME 指向 `knexio-site.pages.dev` 且已代理；`api.knexio.xyz` CNAME 指向 `storyflow-api.tianzhenkai.workers.dev` 且已代理。根域名另有 3 条 Cloudflare Email Routing MX、1 条 DKIM TXT、1 条 SPF TXT，以及 2 条 Google Search Console 验证 TXT。Cloudflare 当前建议包括为邮件增加 SPF/DMARC 保护，以及补充 `www` 记录；其中 `www` 是否需要补充应先确认是否希望 `www.knexio.xyz` 可访问，不能直接添加。

SSL/TLS 概览显示当前加密模式为“完全（Full）”，自动模式已禁用约 208 天；近 24 小时流量包含 TLS 1.2 与 TLS 1.3。由于 Pages 和 Workers 目标本身使用 HTTPS，这个模式目前没有明显故障迹象，但仍需进一步核对“始终使用 HTTPS”、最低 TLS 版本和 HSTS 细节后再提出修改建议。

缓存配置显示缓存级别为“标准”，浏览器缓存 TTL 为 4 小时；未看到开发模式开启的迹象。站点为静态内容站，4 小时浏览器缓存通常不构成问题，但需要结合 Pages 部署和 HTML 更新策略判断是否需要更短 TTL 或采用 Cache Rules，不建议直接启用“缓存一切”。

## markdownmaster.site

DNS 页面显示共 10 条记录。根域名和 `www` 均为 CNAME，指向 `tool-markdown.pages.dev` 且已代理；另有 `storyflow.markdownmaster.site` Tunnel 记录和一条名称显示为 `markdowmaster.site.markdownmaster.site` 的 Tunnel 记录，后者疑似拼写错误或历史残留，需要用户确认用途后再考虑删除，不能仅凭名称直接删除。该站点有 5 条 Registrar Email Forwarding MX 和 1 条 Google Search Console 验证 TXT。Cloudflare 当前建议为补充 SPF 与 DMARC；如果该域名不发送邮件，应先确认是否保留 Email Forwarding，再决定是否补齐邮件认证。

## affiliate-link-injector Worker

Worker 生产页面显示项目存在生产环境，并有 `域 1`、`Workers 0`、`Queues 0`、`绑定 1` 的摘要；目前尚未确认它是否绑定到 `knexio.xyz`、`markdownmaster.site` 或其他实际流量路径。需要继续读取其触发器、路由、绑定和最近部署信息，才能判断是否为必要项目或可清理的旧项目。未经确认不应停用或删除。

## 初步风险判断

当前最值得进一步核对的项目是 `markdownmaster.site` 的疑似拼写错误 Tunnel 记录、两个域名的 `www` 访问策略、邮件转发与 SPF/DMARC 的匹配关系，以及 `affiliate-link-injector` Worker 是否仍被任何域名路由使用。现阶段没有证据表明应立即修改配置。

## Workers 和 Pages 项目清单

账户的 Workers 和 Pages 页面显示共 5 个项目：`affiliate-link-injector`、`tool-markdown`、`knexio-site`、`storyflow-api` 和 `persona-pop`。

`tool-markdown` 最近约 8 分钟前部署，生产域名包括 `markdownmaster.site`、`www.markdownmaster.site` 和 `tool-markdown.pages.dev`，当前是 markdownmaster.site 的实际 Pages 站点。页面显示无 Git 连接，但部署仍在持续更新，不能因“无 Git 连接”直接判断为废弃项目；应确认部署来源和是否还要保留手动部署流程。

`knexio-site` 最近约 1 天前部署，当前只有 `knexio-site.pages.dev`，没有看到自定义域；其部署记录显示持续由 main 分支产生，项目页摘要标记为无 Git 连接。由于 `knexio.xyz` DNS 根域名实际指向 `knexio-site.pages.dev`，它仍是当前主站生产项目，不应删除或停用。建议后续核对 Cloudflare Pages 项目中的自定义域显示和实际 DNS 绑定是否保持一致，但不改变现有生产链路。

`storyflow-api` 最近约 2 个月前有部署，默认地址为 `storyflow-api.tianzhenkai.workers.dev`，账户清单显示它与 `api.knexio.xyz` 以及另一个路由关联。最近 24 小时调用次数、CPU 时间和错误均为 0/数据不足；不能据此断定可删除，因为 `api.knexio.xyz` 仍有 DNS CNAME 指向该 Worker。其域名和路由详细页本轮加载时出现 Cloudflare 页面错误，因此该关联需要下一轮单独复核。当前不建议停用。

`affiliate-link-injector` 最近约 8 分钟前有约 1.1k 请求，错误为 0；其 Worker 页面显示存在生产域名/路由入口和 1 个绑定。页面入口显示它与 `markdownmaster.site` 相关，说明它可能仍在 markdownmaster.site 流量链路中。需要先查看代码用途和路由匹配范围，再决定是否保留或收窄范围。

`persona-pop` 最近约 2 个月前部署，只有 `persona-pop-2h2.pages.dev`，未见已接入的自定义域，部署记录较旧。它更像独立的历史 Pages 项目，但是否删除取决于用户是否还需要该演示站或历史链接；建议先访问验证页面内容、确认无外部引用后再考虑归档或删除。

## 本轮不修改原则

本轮没有点击保存、删除、停用、清除缓存、修改 DNS、修改路由或修改 SSL/缓存设置。任何删除疑似历史项目、Tunnel 记录、路由或邮件记录的操作都需要先确认用途和备份方案。
