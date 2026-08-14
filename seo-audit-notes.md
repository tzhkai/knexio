# AdSense 与 SEO 优化审计依据

研究日期：2026-08-14

## 公开政策与 SEO 原则

Google 的以人为本内容指引强调：内容应服务于明确受众和站点主题；提供原创信息、研究或分析；让读者清楚知道谁创建内容、如何创建以及为什么创建；不应因仅追逐搜索访问量而批量自动生成页面。[1]

Google 的 Article 结构化数据文档建议页面的标记反映真实可见内容，并在适用时提供标题、作者、发布日期/修改日期、代表性图片以及作者 URL。标记本身不保证搜索结果中的富媒体展示。[2]

Google 的结构化数据通用规范要求标记必须真实代表页面主内容、不得隐藏或误导、不得包含伪造内容；可使用 Rich Results Test 和 URL Inspection 做技术检查。[3]

Google 的 sitemap 文档建议站点根路径中的 sitemap 使用完整绝对 canonical URL，且只列出希望出现在搜索结果中的页面；`lastmod` 仅在页面有实质改动时更新。提交 sitemap 是提示而非索引保证。[4]

## 当前技术方向

1. 保持单一主题：实用 AI 工作流，不将站点扩散为无关联热点目录。
2. 将每篇工作流的作者/编辑归属、更新时间、适用边界、人工核验与来源方法呈现在可见页面中。
3. 使用符合页面正文的 WebSite、Organization、BreadcrumbList、ItemList 与 Article JSON-LD，不生成虚构评论、评分、人物身份或测试结果。
4. 为正式自定义域名准备 absolute sitemap 和 robots 指向；在域名尚未确定时，不写入假定 canonical 域名。
5. 把 Search Console、Rich Results Test 与 URL Inspection 纳入正式发布后检查，而不把 sitemap 或结构化数据当作排名承诺。

## 参考来源

[1] Google Search Central, Creating helpful, reliable, people-first content — https://developers.google.com/search/docs/fundamentals/creating-helpful-content

[2] Google Search Central, Article structured data — https://developers.google.com/search/docs/appearance/structured-data/article

[3] Google Search Central, General structured data guidelines — https://developers.google.com/search/docs/appearance/structured-data/sd-policies

[4] Google Search Central, Build and submit a sitemap — https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
