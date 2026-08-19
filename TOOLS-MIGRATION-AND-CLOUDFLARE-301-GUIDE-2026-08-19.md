# 两个 Workflow utility 的 URL 迁移与 Cloudflare 301 指南

## 1. 新工具 URL

两个工具已在 Workflow Library 中实现，并使用与旧站 canonical 相同的规范路径：

| 工具 | 新 URL | 旧仓库 canonical | 是否需要对 canonical URL 建 301 |
|---|---|---|---:|
| AI Prompt Word Counter | `https://knexio.xyz/tools/ai-prompt-word-counter/` | `https://knexio.xyz/tools/ai-prompt-word-counter/` | 否 |
| Markdown Preview | `https://knexio.xyz/tools/markdown-preview/` | `https://knexio.xyz/tools/markdown-preview/` | 否 |

由于旧页面和新页面使用相同的 canonical URL，不能创建“旧 URL → 相同 URL”的 301，这会形成自重定向或无效规则。新应用已经直接接管这两个路径；旧页面的内容实现已被安全重做，不是直接复制旧 HTML。

## 2. 可以迁移的旧入口

旧仓库使用静态目录 `tools/<slug>/index.html`。如果旧站曾经允许访问以下入口，则可以把它们各自重定向到新的目录规范 URL：

| 旧入口 | 新目标 | 状态码 | 查询参数 |
|---|---|---:|---|
| `/tools/ai-prompt-word-counter/index.html` | `https://knexio.xyz/tools/ai-prompt-word-counter/` | 301 | 保留 |
| `/tools/markdown-preview/index.html` | `https://knexio.xyz/tools/markdown-preview/` | 301 | 保留 |

不要凭猜测新增 `/tools/ai-prompt-word-counter.html`、`/tools/markdown-preview.html` 或其他变体。如果 Cloudflare/Pages 日志没有显示这些 URL 曾被访问，暂时不要创建规则。

## 3. Cloudflare Single Redirects 配置

前提是 `knexio.xyz` DNS 记录处于 Proxied 状态，因为 Single Redirects 只对经过 Cloudflare 代理的请求生效。[1]

在 Cloudflare 控制台进入 **Websites → knexio.xyz → Rules → Redirect Rules → Create rule → Single Redirect**。每条规则单独创建，名称建议使用以下值：

### 规则一

**Rule name：** `legacy-ai-prompt-word-counter-index-to-directory`

在表达式编辑器中填写：

```text
(http.host eq "knexio.xyz" and http.request.uri.path eq "/tools/ai-prompt-word-counter/index.html")
```

Action 选择 **Static URL**，目标填写：

```text
https://knexio.xyz/tools/ai-prompt-word-counter/
```

状态码选择 **301 - Permanent Redirect**，启用 **Preserve query string**。保存后先保持规则启用，但不要收窄 Worker 或删除旧逻辑。

### 规则二

**Rule name：** `legacy-markdown-preview-index-to-directory`

表达式：

```text
(http.host eq "knexio.xyz" and http.request.uri.path eq "/tools/markdown-preview/index.html")
```

Action 选择 **Static URL**，目标填写：

```text
https://knexio.xyz/tools/markdown-preview/
```

同样选择 301，并启用 **Preserve query string**。

## 4. 验证与回滚

规则发布后，用以下命令验证旧入口只发生一次跳转，并确认新 URL 返回 200。查询参数会被保留，因此测试时可以加入 `?source=legacy-test`：

```bash
curl -sSIL "https://knexio.xyz/tools/ai-prompt-word-counter/index.html?source=legacy-test"
curl -sSIL "https://knexio.xyz/tools/markdown-preview/index.html?source=legacy-test"
curl -sSIL "https://knexio.xyz/tools/ai-prompt-word-counter/"
curl -sSIL "https://knexio.xyz/tools/markdown-preview/"
```

预期结果是两个旧入口各返回一次 `301`，`Location` 分别指向对应新目录并包含查询参数；两个新 URL 返回 `200`。如果出现 301 链、循环、目标 404、Worker 改写覆盖或查询参数丢失，应立即在 Redirect Rules 中暂停对应规则，恢复前记录的配置截图或导出内容，再重新检查 Worker 的执行顺序。

Cloudflare 规则上线后，不要立即删除 `affiliate-link-injector`。先观察 24–72 小时的请求和错误情况，确认 Worker 没有对这两个入口重复重定向，也没有因为路由顺序导致新工具页面被代理到旧源站。只有在后续迁移计划中已经证明 Worker 不再负责这些旧入口时，才考虑收窄其路由。

## 5. 工具页交互规范

两个页面共用同一个 `ToolFrame` 模板：顶部保留 Workflow Library 的品牌导航和面包屑；标题采用“任务结果 + 斜体动作词”的编辑式层级；工具区使用浅色输入面板与深绿色检查面板形成左右对照；底部提供本地处理说明、隐私边界和两条相关指南内链。

交互上，输入区必须有明确的可见标签、键盘可达焦点状态、移动端可滚动的多行文本框和清晰的 Clear/Copy 操作。统计结果应即时更新，但不把词数误称为模型 token 数。Markdown 预览仅支持经过转义的标题、列表、引用、强调、行内代码和围栏代码，不解释原始 HTML 或任意链接，降低 XSS 与误导风险。

## 6. 已完成的站内接入

两个路由已经加入应用、静态 SEO 元数据、Open Graph/canonical 生成和 `sitemap-pages.xml`；页脚 Explore 区域提供稳定入口，工具页内部还链接到 Brief-first、Research brief 和 Project update 指南。测试覆盖提示词计数、Markdown 基础语法和原始 HTML 转义。

## 参考资料

[1]: https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/ "Cloudflare：在控制台创建 Single Redirects"
[2]: https://developers.cloudflare.com/rules/url-forwarding/ "Cloudflare：Redirects 规则与执行说明"
