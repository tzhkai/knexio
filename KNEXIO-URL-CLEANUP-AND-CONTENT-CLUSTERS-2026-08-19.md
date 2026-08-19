# knexio.xyz 旧 URL 清理与 Workflow Library 内容集群方案

**检查日期：** 2026-08-19  
**站点：** https://knexio.xyz/  
**作者：** Manus AI

## 1. 目标与边界

本方案同时处理两个问题：第一，清理 `knexio.xyz` 仍可能出现在 Search Console、外部链接或历史浏览记录中的旧站 URL；第二，为新的 Workflow Library 建立稳定的专题枢纽、内容集群和内部链接关系。

方案不建议一次性删除所有旧路径，也不建议把所有旧页面统一重定向到首页。每个旧 URL 都应根据主题相关性、历史价值、当前目标页面和用户意图进行分类。没有可信对应页面的旧 URL，应保留 404 或返回 410，而不是制造与原内容无关的 301。

当前还存在一个重要边界：Search Console 的历史报告仍混有旧站页面，例如 `gemini-ai-not-working`、`chatgpt-not-working`、工具页和游戏页。因此，旧 URL 清理的目标不仅是减少 404，还要让域名逐渐形成与 Workflow Library 一致的主题信号。

## 2. 旧 URL 清理策略

### 2.1 URL 分类标准

| 类别 | 判定条件 | 处理方式 | 示例 |
|---|---|---|---|
| A：高度相关且有新页面承接 | 旧页面主题与新指南的任务意图基本一致 | 单次 301 到最相关的新页面 | 旧的项目更新文章 → `clear-project-update-prompt` |
| B：部分相关但新站无等价页面 | 旧页面仍有外部引用，但当前没有准确替代品 | 暂不重定向；先保留 404/410，必要时新建真正承接页 | 旧 AI 工具介绍 → 不直接跳到 Evidence Matrix |
| C：旧站专题或聚合页 | 旧分类与新专题有明确语义重合 | 仅在内容和用户意图确实匹配时 301 到专题枢纽 | 旧 research 类聚合页 → Research & decisions |
| D：无关、低质量或测试路径 | 游戏、临时页、重复页、明显拼写错误、测试文件 | 404 或 410，不做首页 301 | `games/*`、测试 slug |
| E：系统与发现文件 | robots、旧 sitemap、favicon、静态资源 | 保留必要入口或迁移到源站；不能用普通内容规则替代 | `/robots.txt`、`/sitemap.xml` |
| F：仍在业务使用的 URL | 当前 Worker、Pages、工具或外部系统仍依赖 | 先保留并记录依赖，未经验证不得删除或重定向 | 工具页、联盟入口、API 路径 |

### 2.2 301 的目标选择规则

只有在旧页面与新页面满足“同一用户问题、同一主要意图、目标页面能够兑现旧页面承诺”三个条件时，才使用 301。最稳妥的映射优先级是“旧具体文章 → 新具体指南”，其次是“旧专题 → 新专题枢纽”，最后才是“旧页面 → 首页”。首页只能作为极少数品牌根路径的最终目标，不应成为无关旧文章的默认落点。

建议为每个旧 URL 建立一张映射表，并在部署前补齐实际状态：

| 旧 URL | 旧主题 | 当前 HTTP 状态 | 是否有外部链接/曝光 | 新目标 | 类型 | 保留查询参数 | 验证结果 |
|---|---|---:|---|---|---|---|---|
| `/旧路径-1/` | 待核对 | 待测 | 待查 | `/guides/.../` | 301/404 | 是/否 | 待测 |
| `/旧路径-2/` | 待核对 | 待测 | 待查 | `/workflows/.../` | 301/404 | 是/否 | 待测 |

表中不能凭 URL 名称猜测映射。应先用旧站备份、Git 历史、Cloudflare Worker 源码、Search Console 页面维度和外部链接报告共同确认。

### 2.3 推荐的实施顺序

先导出或保存当前 Worker 配置和旧 URL 列表；然后在不改变 Worker 的情况下建立基线，记录每个 URL 的状态码、`Location`、最终状态、跳转次数和查询参数行为。接着只上线少量明确的一对一映射，验证后再加入其余规则。最后再考虑把 HTTP/HTTPS、www、尾斜杠、旧 sitemap 等规范化职责从 Worker 拆出。

Cloudflare Single Redirects 支持静态或动态目标、通配符、301/302/307/308 以及查询字符串保留；对应主机名必须经过 Cloudflare 代理。[1] 对于大量固定 URL，Bulk Redirects 更适合，因为它可以维护 URL 映射表，但不支持复杂的字符串替换或正则逻辑。[2]

当前 `affiliate-link-injector` 还承担 Pages 代理、HTML 联盟链接注入、robots 和 sitemap 响应，因此**不能把 Worker 直接收窄为只处理旧 URL**。规范化和旧 URL 重定向迁移完成后，仍需单独验证 HTML 注入、静态资源和发现文件，再收窄路由。

### 2.4 Cloudflare 规则建议

对于固定的一对一旧 URL，建议使用 Bulk Redirects 或少量 Single Redirects。每条规则使用 301，目标必须是最终规范地址，并根据现有业务决定是否保留查询字符串。对于 `www → apex`，可使用单独的通配符规则；对于 HTTP → HTTPS，若 Cloudflare 的 Always Use HTTPS 已稳定启用，则不应再创建重复规则。

示意配置如下，实际目标路径必须以映射表核对结果为准：

```text
Request URL: https://www.markdownmaster.site/*
Target URL: https://markdownmaster.site/${1}
Status: 301
Preserve query string: enabled
```

上面的示例属于 `markdownmaster.site` 的 affiliate Worker 迁移参考，不应未经确认直接应用到 `knexio.xyz`。`knexio.xyz` 当前应以自己的 Zone、Pages 部署和实际旧 URL 清单为准。

### 2.5 回滚与验证

每次规则变更前，应保存规则名称、表达式、目标地址和原 Worker 版本。规则发布后，至少测试旧 URL、目标 URL、带查询参数的 URL、无关 URL、静态资源、robots、sitemap 和 404 页面。合格结果应是旧 URL 一次 301 到最终页面、最终页面 200、canonical 指向最终地址、静态资源 200、无关旧路径仍按预期 404/410。

Cloudflare Trace 可用于确认请求实际命中了哪一条 Redirect Rule；当 Single Redirects、Bulk Redirects、Page Rules 与 Worker 并存时，应使用 Trace 排查规则优先级和重复跳转。[3]

建议观察至少一个完整 Search Console 抓取周期后再删除 Worker 中对应分支。若出现跳转链、联盟按钮消失、robots/sitemap 异常或核心页面 404，应先停用新规则或恢复原 Worker 版本，而不是继续叠加规则。

## 3. Workflow Library 当前内容结构

当前内容库按四个主题组织，并已有一套专题枢纽和阅读路径数据。四个主题不是泛泛的 AI 关键词分类，而是围绕真实工作任务形成的内容集群：Research & decisions、Writing & updates、Meetings & follow-up、Planning & priorities。

### 3.1 Research & decisions

**核心承诺：** 把来源、证据、假设和决策问题放在同一条可审阅的记录里。

| 页面角色 | 当前页面 |
|---|---|
| 主题枢纽 | `/workflows/research-and-decisions/` |
| 核心入口 | `/guides/research-brief-from-scattered-sources/` |
| 高意图深度页 | `/guides/evidence-matrix-from-source-notes/` |
| 决策记录页 | `/guides/project-notes-to-decision-memo/`、`/guides/decision-log-from-project-notes/` |
| 研究方法页 | `/guides/customer-feedback-theme-map/` |
| 支撑页 | `/guides/brief-first-prompt-pattern/` |

该集群的主链接路径应是：专题枢纽 → Research Brief → Evidence Matrix → Decision Memo/Decision Log。Evidence Matrix 应同时链接到 Research Brief、Decision Memo 和 Planning 中的项目起步计划，因为它解决的是“在做决定前如何处理证据”，而不是孤立的表格模板。

建议首页用自然文案链接到 Research & decisions，例如“从分散资料整理出可审阅的研究简报”，而不是反复使用完全相同的“点击这里”。

### 3.2 Writing & updates

**核心承诺：** 将原始进展记录变成不夸大完成度、明确背景、风险、决定和下一步的沟通稿。

| 页面角色 | 当前页面 |
|---|---|
| 主题枢纽 | `/workflows/writing-and-updates/` |
| 核心入口 | `/guides/clear-project-update-prompt/` |
| 通用提示框架 | `/guides/brief-first-prompt-pattern/` |
| 相邻应用页 | `/guides/meeting-follow-up-email/` |
| 相关决策沟通页 | `turn-rough-notes-into-decision-email` 对应页面需在部署路由中确认 |

该集群的主链接路径应是：Brief-first Prompt → Clear Project Update → Meeting Follow-up Email。Clear Project Update 也应链接到 Meetings 枢纽，因为会议后续邮件和项目状态更新共享“不能凭空添加承诺”的约束。

### 3.3 Meetings & follow-up

**核心承诺：** 让会议记录成为可以确认的决定、行动、负责人、日期和待解决问题，而不是漂亮的逐字稿。

| 页面角色 | 当前页面 |
|---|---|
| 主题枢纽 | `/workflows/meetings-and-follow-up/` |
| 行动项入口 | `/guides/meeting-notes-to-action-list/` |
| 会前准备 | `/guides/meeting-agenda-from-notes/` |
| 会后沟通 | `/guides/meeting-follow-up-email/` |
| 决策简报 | `/guides/meeting-notes-to-decision-brief/` |
| 独立比较页 | `/workflows/meetings/meeting-minutes-vs-decision-brief/` |
| 关联更新页 | `/guides/clear-project-update-prompt/` |

这个集群最适合形成明确的顺序阅读：Meeting Agenda → Meeting Notes to Action List → Meeting Minutes vs Decision Brief → Meeting Follow-up Email。Meeting Minutes vs Decision Brief 应作为比较型长尾入口，同时链接回行动项指南和决策简报指南；反向链接也应存在，以便 Google 和用户理解它们的关系。

### 3.4 Planning & priorities

**核心承诺：** 把拥挤的任务列表变成足够小、可以开始、并且能显示依赖和取舍的计划。

| 页面角色 | 当前页面 |
|---|---|
| 主题枢纽 | `/workflows/planning-and-priorities/` |
| 周计划页 | `/guides/weekly-priorities-from-project-list/` |
| 起步计划页 | `/guides/thirty-minute-project-starting-plan/` |
| 内容规划页 | `/guides/one-week-content-plan-from-questions/` |
| 交接页 | `/guides/project-handoff-brief/` |
| 相关决策页 | `/guides/project-notes-to-decision-memo/`、`/guides/decision-log-from-project-notes/` |

该集群的主路径应是：Thirty-minute Starting Plan → Weekly Priorities → Project Handoff。One-week Content Plan 应作为 Planning 集群中的特殊分支，并链接到站点的内容更新计划，而不是被误认为泛泛的“AI 写作”文章。

## 4. 内部链接矩阵

内部链接应服务于阅读决策，而不是单纯增加链接数量。每个指南页至少应有一个返回所属专题的面包屑或显式链接、一个正文中的上下文链接、一个文章底部的相关推荐模块，以及一个明确的下一步链接。相邻文章之间应采用不同但准确的锚文本，避免所有链接都使用同一个关键词。

| 来源页面 | 目标页面 | 推荐锚文本 | 链接目的 |
|---|---|---|---|
| 首页 | Research & decisions | 从来源笔记建立可审阅的研究路径 | 主题入口 |
| 首页 | Meetings & follow-up | 把会议记录变成可确认的下一步 | 主题入口 |
| 首页 | Planning & priorities | 从拥挤任务列表找到一个可信起点 | 主题入口 |
| Research Brief | Evidence Matrix | 在写简报前先把证据和缺口列成矩阵 | 顺序深化 |
| Evidence Matrix | Decision Log | 将证据检查结果保存为可复查的决策记录 | 应用延伸 |
| Evidence Matrix | Research Brief | 如果你还没有明确问题，先从一页研究简报开始 | 前置步骤 |
| Decision Memo | Evidence Matrix | 用证据矩阵检查最可能改变决定的主张 | 方法回链 |
| Clear Project Update | Brief-first Prompt | 先用 brief-first 结构明确读者、约束和输出 | 基础方法 |
| Clear Project Update | Meeting Follow-up Email | 如果素材来自会议，请将确认项单独写进后续邮件 | 相邻任务 |
| Meeting Agenda | Meeting Notes to Action List | 会后把讨论整理为负责人和日期明确的行动项 | 下一步 |
| Meeting Notes to Action List | Meeting Minutes vs Decision Brief | 先区分行动清单与需要解释决定背景的简报 | 概念比较 |
| Meeting Minutes vs Decision Brief | Meeting Notes to Action List | 如果你只需要负责人和截止日期，从行动清单开始 | 任务分流 |
| Meeting Minutes vs Decision Brief | Meeting Notes to Decision Brief | 如果需要记录选择、依据和未决问题，查看决策简报流程 | 深化 |
| Meeting Follow-up Email | Clear Project Update | 将已确认的会议结果转成面向项目读者的更新 | 跨集群 |
| Weekly Priorities | Thirty-minute Starting Plan | 先把本周第一个可信动作缩小到 30 分钟 | 前置任务 |
| Thirty-minute Starting Plan | Weekly Priorities | 当第一步明确后，再决定本周真正要推进什么 | 下一步 |
| Project Handoff | Decision Log | 在交接前保留决定、证据、风险和未决问题 | 记录连续性 |
| Project Handoff | Research Brief | 需要重新理解背景时，从一页研究简报恢复上下文 | 前置阅读 |
| One-week Content Plan | Research Brief | 用真实问题和来源建立内容计划，而不是堆趋势词 | 方法约束 |
| 所有指南页 | 所属专题页 | 返回 Research / Writing / Meetings / Planning workflow | 主题归属 |

## 5. 页面模板中的链接位置

首页只需要展示四个主题入口、一个按顺序阅读入口和少量精选指南。首页不应堆出所有文章，否则会削弱主题层级。内容库页应提供四个主题过滤入口，并在页面正文中用一段文字链接到四个专题枢纽。

专题页应在首屏说明适用场景，列出核心指南，再按“先理解问题、再执行任务、最后复核结果”的顺序组织页面。每个主题页至少链接到三个指南，并在末尾链接到相邻专题，例如 Research → Planning，Meetings → Writing，Planning → Research。

指南页应保持四类内部链接：面包屑或返回专题、正文上下文链接、相关推荐、上一篇/下一篇或顺序阅读。正文中的链接应放在真正解释概念的句子里，而不是在段落末尾机械添加。相关推荐应优先使用同一主题内的相邻任务；跨主题推荐最多保留 1–2 个真正有用的下一步。

## 6. 内容集群的新增内容顺序

接下来不应按“哪个词最热门”逐个发布，而应按能够补齐用户任务链的顺序发布。第一优先级是补齐 Meetings 的决策简报和会议记录比较路径，因为该主题已有行动项、议程、跟进邮件和独立比较页。第二优先级是补齐 Research 的 Decision Memo 与 Evidence Matrix 之间的关系，强化“证据 → 决策记录”的路径。第三优先级是补齐 Planning 的交接和周优先级应用场景。第四优先级才是拓展 Writing 的具体沟通场景。

每个新页面发布前应先确定四项内容：它解决的单一读者问题、所属专题、至少两个现有页面链接，以及一个它发布后应该承接的下一页面。若无法写出自然的内链关系，则说明主题仍然过宽或页面不应立即发布。

## 7. 监测指标与维护节奏

Search Console 应按目录观察 `/guides/` 和 `/workflows/`，不要只看域名总数。新站上线后前两周主要观察是否被发现、是否出现展示和是否有抓取异常；达到 14–28 天后再比较不同专题的曝光、平均排名和查询词。

| 指标 | 监测方法 | 触发动作 |
|---|---|---|
| 孤立页 | 每次发布检查至少 2 个内部入链 | 没有入链时先补专题页和相关推荐 |
| 主题页曝光 | 按 `/workflows/` 过滤 | 若无曝光，补首页、内容库和指南回链 |
| 指南曝光 | 按具体 URL 检查 | 先核对收录、canonical、sitemap 和正文链接 |
| 平均排名 8–25 | Search Console 页面维度 | 优先改标题、摘要、首段和内部锚文本 |
| 曝光有但 CTR 为 0 | Search Console 查询/页面维度 | 检查标题承诺、描述与搜索意图是否一致 |
| 301 链 | curl、Cloudflare Trace、Search Console | 出现两次以上跳转时合并规则 |
| 404 增长 | Search Console 页面和站点日志 | 区分真正旧 URL 与错误内部链接 |

## 8. 实施优先级

### 第一阶段：只做审计和低风险链接修正

建立旧 URL 清单，补齐实际状态码和目标映射；确认 sitemap 只列出新的有效页面；检查四个专题页是否都能从首页或内容库进入；为当前孤立或弱入口的指南补回链。此阶段不删除 Worker 分支，也不批量创建 301。

### 第二阶段：上线少量明确 301

只部署已经证明高度相关的旧 URL 映射，并验证一次跳转、目标 200、canonical 和查询参数。对于无明确承接页的旧 URL，继续保留 404/410，不为了减少错误数量而做无关 301。

### 第三阶段：补齐主题集群

优先完善 Meetings 与 Research 的任务链，随后完善 Planning 和 Writing。每篇新文章必须接入一个专题枢纽、一个前置页面和一个后续页面，并同步更新相关推荐、顺序阅读和 sitemap。

### 第四阶段：数据驱动优化

等待新站获得至少 14–28 天的 Search Console 数据后，按专题比较曝光和平均排名。对已经有展示但没有点击的页面改写标题和摘要；对排名 20–50 的页面优先增加具体示例、FAQ、验证边界和上下文内链；对完全无展示的页面先核对收录和发现路径，而不是立即重写关键词。

## 9. 最终建议

旧站清理的目标不是让所有旧 URL 都变成 301，而是让每个 URL 都有明确、诚实的最终状态：相关页面单次 301，不相关页面 404/410，系统文件稳定返回，仍在业务使用的 Worker 职责暂不拆除。这样既能减少无意义的重定向链，也能避免把旧站主题错误地传递给新 Workflow Library。

新站的增长重点应放在四个清晰集群和它们之间的任务连续性上。当前最有价值的内链不是增加更多链接，而是让用户和搜索引擎都能理解：研究简报如何进入证据矩阵，证据矩阵如何进入决策记录；会议议程如何进入行动清单，行动清单如何进入决策简报和跟进邮件；项目起步计划如何进入周优先级，交接简报如何保留决策和证据。

## References

[1]: https://developers.cloudflare.com/rules/url-forwarding/single-redirects/ "Cloudflare Single Redirects"
[2]: https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/ "Cloudflare Bulk Redirects"
[3]: https://developers.cloudflare.com/rules/url-forwarding/ "Cloudflare Redirects 执行顺序与配额"

## Internal records

- `CLOUDFLARE-AFFILIATE-MIGRATION-AND-PERSONA-ARCHIVE-2026-08-18.md`
- `SEARCH-CONSOLE-INDEX-REQUESTS-2026-08-17.md`
- `client/src/lib/content.ts`
