# Knexio AdSense 再申请前修复路线

> 本文件是基于 2026-08-31 线上复审和 `adsense-site-auditor` 73 项清单的工作计划。它不保证 AdSense 审核通过、排名、流量或收益。

## 当前判断

当前结论为 **Ready after fixes，而不是立即提交**。技术可访问性、规范链接、robots、sitemap、ads.txt、基础信任页面和公开内容入口均有证据支持；但上次 AdSense 后台的 `Needs attention / Low value content` 仍是决定性风险。本次浏览器无法进入已登录 AdSense 后台，因此当前账户状态、Policy Center 和审核按钮状态在本轮标为 **Unknown**，不能把旧状态当作新验证结果。

## 已有证据支持的通过项

| 范围 | 证据 |
| --- | --- |
| 公开访问 | 首页、指南库、专题页、About、Contact、Privacy、Terms、两个工具页均返回 HTTP 200。 |
| 抓取基础 | `robots.txt` 允许公开抓取并声明 `sitemap_index.xml`；三个子 sitemap 使用 HTTPS。 |
| 站点身份 | canonical、H1、JSON-LD、About、Contact、Privacy、Terms 和编辑方法入口均可见。 |
| 广告基础 | `/ads.txt` 返回 Google authorized seller 行；本次未发现诱导点击或广告覆盖正文的公开实现。 |
| 内容边界 | 旗舰指南有 Sources & method、公开来源、案例边界、原创工件和 Human check；没有新增虚构案例、评价、资历、结果或热门度。 |
| 隐私边界 | Privacy 页面公开 Google 技术、cookie/本地存储和第三方披露；可选分析仍采用同意门控。真实 EEA/UK/Swiss 四步 CMP 仍未完成，不能标 Pass。 |

## 必须先处理的内容价值风险

### 1. 不再扩大同模板文章规模

当前内容库为 18 个指南记录，但只有 4 个指南带完整 `Sources & method` 方法记录。审计风险不是页面数量不足，而是读者可能把相邻任务页视为同一种 Prompt → Steps → Checks 模板。下一批工作应优先改造已有高意图页面，而不是继续新增相似 URL。

### 2. 为 4 篇旗舰指南增加可证明的编辑责任说明

在每篇旗舰指南现有 Author & review record 中，补充一份**页面专属**的编辑记录：本页解决的边界、使用的公开来源、哪些内容是 illustrative/composite、哪些内容没有被验证，以及发布日期以来做过的实质检查。不得写不存在的个人作者、客户项目、测试数据或专业资历。

### 3. 把相邻页面明确分工

为 `decision-log-from-project-notes`、`project-notes-to-decision-memo`、`turn-rough-notes-into-decision-email`、`meeting-notes-to-action-list` 等相邻页面增加页面级输入/输出差异表和“何时不要用本页”的说明。保留 URL，不删除、不重定向、不虚构合并关系。目标是让读者能直接判断页面之间的不同，而不是靠标题猜测。

### 4. 对工具页保持独立价值

Prompt Counter 和 Markdown Preview 应继续保留真实使用示例、限制、浏览器本地处理边界、导出/复制结果说明和相关指南链接。工具页不能只作为广告承载页，也不能用虚假的使用量、评分或评论证明价值。

## 可执行顺序

1. 先完成 4 篇旗舰指南的页面专属编辑记录和相邻页面差异化说明。
2. 运行 Vitest、TypeScript、Cloudflare 静态构建，并对旗舰页和相邻页面做桌面/375px 复核。
3. 更新 sitemap lastmod 仅反映实质更新；不重复提交 Search Console 索引请求。
4. 重新读取线上代表性页面，确认 canonical、JSON-LD、Sources & method、编辑记录和内链均可见。
5. 若用户能提供真实 EEA/UK/Swiss 网络或 Google 官方可交互预览，再单独完成 CMP 的 Consent → Reject → Manage → revoke 测试；否则继续标记 Unknown。
6. 只有在上述内容修复完成、后台状态可读且没有新的 Blocker/High 风险时，才建议用户自行在 AdSense 控制台提交；提交动作必须另行明确确认。

## 不应采取的措施

不购买流量、不制造点击、不重复提交索引、不删除或批量 301 相似页面、不添加虚假热门/评论/案例、不为了审核堆叠短文、不更改 Google Privacy & messaging 后台消息、不声称真实地区 CMP 已通过测试。

## 参考证据

- `ADSENSE-RESUBMISSION-AUDIT-2026-08-31.md`
- `/home/ubuntu/knexio-adsense-audit-20260831/http-summary.txt`
- `/home/ubuntu/knexio-adsense-audit-20260831/guide-coverage.json`
- [Google AdSense eligibility requirements](https://support.google.com/adsense/answer/9724?hl=en)
- [Google AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en)
