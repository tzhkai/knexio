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
