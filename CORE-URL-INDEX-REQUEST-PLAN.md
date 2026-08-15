# Workflow Library：核心 URL 检查与索引请求范围

**资源：** `sc-domain:knexio.xyz`  
**执行原则：** 优先检查站点的信息架构枢纽与高意图原始指南；不批量请求全部 URL；不重复请求已在本会话中发起过请求的文章。

| 优先级 | URL | 页面角色 | 选择理由 | 本轮动作 |
|---|---|---|---|---|
| 1 | `https://knexio.xyz/guides` | 内容库枢纽 | 汇集全部指南，是文章间内部链接与主题理解的入口。 | 先检查；若未被发现再请求。 |
| 2 | `https://knexio.xyz/workflows/research-and-decisions` | 研究专题枢纽 | 连接研究、决策、客户反馈等指南，承接广义 AI research workflow 搜索意图。 | 先检查；若未被发现再请求。 |
| 3 | `https://knexio.xyz/guides/research-brief-from-scattered-sources` | 高意图研究指南 | 对应“AI research workflow”“research brief”等清晰任务需求。 | 先检查；若未被发现再请求。 |
| 4 | `https://knexio.xyz/guides/meeting-notes-to-action-list` | 高意图会议指南 | 对应会议纪要、行动项和 AI meeting notes 的明确任务需求。 | 先检查；若未被发现再请求。 |
| 5 | `https://knexio.xyz/guides/one-week-content-plan-from-questions` | 高意图内容规划指南 | 对应 AI content plan 与内容规划工作流需求。 | 先检查；若未被发现再请求。 |

`/guides/customer-feedback-theme-map` 已在此前会话中触发一次实时索引可用性测试，不在本轮重复请求范围内。首页已显示为历史收录状态，也不在本轮请求范围内。

## 路径规范化前置修复

首次检查 `https://knexio.xyz/guides` 时，Search Console 显示 Google 已抓取该旧版本 URL，但将 `https://knexio.xyz/guides/` 识别为用户声明和 Google 选择的规范地址。Cloudflare 对目录静态入口采用尾斜杠路径；因此在发送新的 URL 索引请求前，站点的 runtime canonical、静态 Meta、sitemap 及 breadcrumb JSON-LD 已统一为尾斜杠形式。后续请求将使用这些最终规范 URL。

## 当前检查结果

`https://knexio.xyz/guides/` 已显示“网址已收录到 Google”，并且 HTTPS 有效。因此内容库枢纽不在本轮请求编入索引范围内；应将有限的请求额度留给尚未发现的专题和高意图指南。

`https://knexio.xyz/workflows/research-and-decisions/` 显示“Google 无法识别此网址”，没有抓取记录、引荐链接或旧 sitemap 引荐。该专题页位于新的 sitemap index 中且生产端已验证可访问，应纳入本轮优先请求候选。

`https://knexio.xyz/guides/research-brief-from-scattered-sources/` 同样显示“Google 无法识别此网址”，没有抓取记录或引荐来源。该指南与研究工作流专题高度相关，且以独立任务为中心，应纳入本轮优先请求候选。

`https://knexio.xyz/guides/meeting-notes-to-action-list/` 也显示“Google 无法识别此网址”，尚无抓取或发现记录。该页面覆盖会议纪要转行动项的明确任务需求，应纳入本轮优先请求候选。

## 已确认请求执行记录

已为 `https://knexio.xyz/guides/meeting-notes-to-action-list/` 发起一次“请求编入索引”。Search Console 正在执行实时可编入索引测试；在结果返回前不会对此 URL 重复点击请求。

实时测试结束后界面返回 URL 检查页，但未显示“已请求编入索引”或失败提示；本会话不会再次点击该 URL，以免重复占用请求额度。后续应在 24–72 小时内通过 URL Inspection 复查抓取或索引状态。

同样已为 `https://knexio.xyz/guides/research-brief-from-scattered-sources/` 发起一次请求，完成实时可编入索引测试后未显示最终确认或失败提示。本会话不会对该 URL 重复提交，后续通过 URL Inspection 复查。

已为 `https://knexio.xyz/workflows/research-and-decisions/` 发起一次请求并触发实时可编入索引测试。测试结束后同样未显示最终确认或失败提示；因此本会话不重复提交。三条请求均应在 24–72 小时后通过 URL Inspection 复查，重点观察首次抓取时间、sitemap 引荐和收录状态。
