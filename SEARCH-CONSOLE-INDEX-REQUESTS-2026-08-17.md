# Search Console 索引请求记录

检查时间：2026-08-17
资源：`sc-domain:knexio.xyz`

## URL 检查结果

URL：`https://knexio.xyz/guides/meeting-notes-to-decision-brief/`

Search Console 当前显示：

- 网址尚未收录到 Google。
- 状态为“网页未编入索引：Google 无法识别此网址”。
- 未检测到任何引荐站点地图。
- 未检测到引荐来源网页。
- 上次抓取时间：不适用。
- 是否允许抓取：不适用。
- 用户声明的规范网址：不适用。
- Google 选择的规范网址：不适用。
- 页面提供“请求编入索引”操作入口。

来源页面：
`https://search.google.com/search-console/inspect?resource_id=sc-domain%3Aknexio.xyz&id=ret497LYN9krpu5E7IlI5Q`

## 提交结果

对 `https://knexio.xyz/guides/meeting-notes-to-decision-brief/` 点击“请求编入索引”后，Search Console 显示“已请求编入索引”。页面仍显示“网址尚未收录到 Google”，这表示请求已进入 Google 处理流程，不代表已经完成收录。建议不要重复点击，等待 Google 后续抓取。

## 2026-08-17 — Meeting Minutes vs Decision Brief

- GitHub Actions `32037326766`（pages-build-deployment）已完成，结论 `success`；同一提交对应的 Cloudflare Pages workflow `32037327580` 也已完成，结论 `success`。
- 正式 URL `https://knexio.xyz/workflows/meetings/meeting-minutes-vs-decision-brief/` 回归结果：HTTP 200；响应正文包含页面 title、canonical、Article JSON-LD、robots index/follow 以及应用入口。
- Search Console 网址检查：首次状态为“网址尚未收录到 Google / Google 无法识别此网址”，且当时尚未检测到引荐站点地图；随后已完成实际网址测试并提交“请求编入索引”。最终界面显示“已请求编入索引”，网址已添加到优先抓取队列。Google 明确提示重复提交不会提高队列优先级。
- 本次仅提交该新页面；没有重复提交已成功读取的 sitemap_index.xml，也没有宣称页面已被收录。

## 2026-08-18 — 网页报告与实时网址检查差异

- Search Console “网页索引编制”报告显示：上次更新日期为 2026/8/14；当时统计为 59 个已编入索引、421 个未编入索引。因此该 Tab 不是实时列表，不能用来判断前两天刚处理页面的即时状态。
- 实时检查 `https://knexio.xyz/guides/evidence-matrix-from-source-notes/` 时，页面未显示“网址已收录到 Google”；首次结果为“Google 无法识别此网址”，需要等待实时检查结论或再次检查。
- 实时检查 `https://knexio.xyz/guides/clear-project-update-prompt/` 完成后，状态为“已发现 - 尚未编入索引”，发现来源为 `https://knexio.xyz/sitemap_index.xml`，明确不是“已编入索引”。
- 实时检查 `https://knexio.xyz/guides/meeting-notes-to-action-list/` 完成后，状态为“网址已收录到 Google / 网页已编入索引”。这说明 Search Console 的 URL 检查结果和“网页”总报告存在更新时间差异。
- 结论：用户看到的“已编入索引”必须以对应 URL 检查页面明确显示“网址已收录到 Google”为准；“已请求编入索引”和“已发现”均不等于已收录。网站自身的专题/分类 Tab 也不会读取 Search Console 状态，它只按本地内容数据渲染。
