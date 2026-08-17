# Google Search Console 查询词与曝光分析

**资源：** `sc-domain:knexio.xyz`   
**检查日期：** 2026-08-17  运行环境：Google Search Console，网页搜索

## 结论摘要

目前没有任何点击。三个月报告显示 **125 次曝光、0 次点击、0% CTR、平均排名 21.9**；但自定义日期 **2026-08-14 至 2026-08-15** 的新站窗口显示 **0 次曝光、0 次点击、0 个查询词**。因此，当前可见的 125 次曝光不能直接当作新站上线后的有效流量，至少在该两日窗口内还没有形成搜索曝光。

Search Console 的数据存在延迟，且新站上线时间与报告窗口不完全重合，所以“新站完全没有曝光”应理解为当前两日数据尚未产生可见曝光，而不是永久性结论。

## 三个月报告指标

| 指标 | 数值 |
|---|---:|
| 总点击次数 | 0 |
| 总曝光次数 | 125 |
| 平均点击率 | 0% |
| 平均排名 | 21.9 |
| 数据截止 | 2026-08-15（页面显示约 3.5 小时前更新） |

## 可见查询词

| 查询词 | 点击 | 曝光 | CTR | 平均排名 | 判断 |
|---|---:|---:|---:|---:|---|
| `ai coding assistant` | 0 | 3 | 0% | 32.0 | 与 AI 主题相关，但当前排名较远 |
| `content not in gemini` | 0 | 1 | 0% | 40.0 | 偶发长尾词，不宜作为主攻词 |
| `steam not launching` | 0 | 1 | 0% | 52.0 | 旧站/旧内容意图，偏离新站定位 |
| `slack not working` | 0 | 1 | 0% | 64.0 | 旧站问题排查意图，偏离新站定位 |
| `slack issue handling` | 0 | 1 | 0% | 72.0 | 旧站问题排查意图，偏离新站定位 |
| `keywordio` | 0 | 1 | 0% | 80.0 | 品牌或工具偶发词，不适合作为内容方向 |
| `ai visualization dashboard` | 0 | 1 | 0% | 84.0 | AI 工具泛需求，排名过远 |
| `ai extract data from pdf` | 0 | 1 | 0% | 97.0 | 与旧站 AI 工具内容有关，当前排名过远 |

## 有曝光的网页

三个月网页维度中，曝光最高的 URL 是：

| 页面 | 曝光 | 平均排名 | 解释 |
|---|---:|---:|---|
| `/guides/gemini-ai-not-working/` | 56 | 21.0 | 占全部曝光约 44.8%，明显是旧站遗留主题 |
| `/` | 25 | 4.6 | 首页仍有一定历史可见性 |
| `/guides/` | 14 | 24.9 | 指南索引页有历史曝光 |
| `/business/` | 8 | 13.4 | 旧站业务专题页 |
| `/about/` | 7 | 4.1 | 信任页历史曝光 |
| `/guides/chatgpt-not-working/` | 7 | 4.1 | 旧站问题排查主题 |
| `/tools/` | 5 | 6.2 | 旧站工具索引页 |
| `/games/` | 5 | 6.6 | 旧站游戏内容 |
| `/guides/steam-not-opening/` | 5 | 34.4 | 旧站问题排查主题 |
| `/contact/` | 4 | 3.3 | 信任页历史曝光 |

后续网页行还包括旧站的 AI 工具、游戏、工具和系统故障排查 URL，例如 `/blogs/ai-code-assistant-tools/`、`/blogs/ai-pdf-chat/`、`/blogs/ai-data-visualization-tools/`、`/tools/password-generator/`、`/games/mini-crossword/` 等。这说明三个月总数据主要混合了旧站 URL 的历史抓取与曝光，不能用来证明新 Workflow Library 专题已经获得搜索流量。

## 对关键词策略的判断

当前 Search Console **尚未显示 Writing、Meetings、Planning、Research & decisions 等新站专题的有效查询词**。这不是关键词策略失败，而是新站数据窗口仍太短，且新内容刚完成部署。现有可见词中只有 `ai coding assistant`、`ai visualization dashboard` 和 `ai extract data from pdf` 与 AI 工具主题相近；其余主要是旧站问题排查或游戏/工具意图。

因此，下一阶段不应根据旧站词继续扩展 Steam、Slack、游戏或通用工具内容，而应继续围绕新站的任务型词建立主题集群，例如：

1. `how to turn meeting notes into action items`
2. `AI meeting notes to action items`
3. `how to write a decision memo`
4. `research brief template with AI`
5. `evidence matrix for research`
6. `how to turn project notes into a decision memo`
7. `AI prompt for weekly planning`
8. `how to prioritize tasks with AI`

这些词目前属于**目标关键词和内容规划词**，不是已经在 Search Console 中获得曝光的词。后续应以 Search Console 实际出现的查询词为依据，逐步调整标题、导语、H2 和内部链接锚文本。

## 下一步建议

建议将当前状态定义为“**新站搜索数据尚未形成，旧站历史数据仍占主导**”。接下来 7–14 天内不应因 0 点击而频繁改版，也不建议删除 Search Console 资源。应保持 sitemap、规范 URL 和专题内部链接稳定，并在 Search Console 产生新数据后，重点观察：新指南 URL 是否出现曝光；查询词是否从旧站故障词转向会议、研究、写作和计划任务；以及平均排名是否从 50 名以外进入 20–40 名区间。

本次原始指标与新站窗口记录见：`SEARCH-CONSOLE-QUERY-DATA-2026-08-17.md`。
