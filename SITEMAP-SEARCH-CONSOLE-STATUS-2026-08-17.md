# Search Console sitemap 状态（2026-08-17）

资源：`sc-domain:knexio.xyz`

页面：<https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aknexio.xyz>

当前记录显示：`https://knexio.xyz/sitemap_index.xml` 已提交，类型为站点地图索引；已提交日期为 2026 年 8 月 15 日，上次读取时间为 2026 年 8 月 15 日，状态为“成功”，已发现网页 82，已发现视频 0。当前页面没有显示新的读取错误，也没有必要重复提交同一个 sitemap。生产环境另外核验到 sitemap_index.xml、sitemap-guides.xml 和 sitemap.xml 均返回 HTTP 200 且为 application/xml；sitemap-guides.xml 已包含 `meeting-notes-to-decision-brief`，共发现 17 个 `<loc>`。

结论：最新生产 sitemap 内容正确，但 Search Console 尚未显示 2026-08-17 的新读取时间；应等待 Google 下一次自动读取，不重复提交相同 URL，以免制造冗余记录。
